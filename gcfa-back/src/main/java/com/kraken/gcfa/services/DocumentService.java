package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.Document;
import com.kraken.gcfa.entity.DocumentType;
import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.repository.DocumentRepository;
import com.kraken.gcfa.repository.DocumentTypeRepository;
import com.kraken.gcfa.repository.TutorRepository;
import com.kraken.gcfa.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 10/04/2017.
 * gcfa-back
 */
@Service
public class DocumentService {

	private final String DOCUMENTATION_FOLDER = "files/document";

	private final Path rootLocation = Paths.get(DOCUMENTATION_FOLDER);

	@Autowired
	private StorageService storageService;

	@Autowired
	private DocumentRepository documentRepository;

	@Autowired
	private DocumentTypeRepository documentTypeRepository;
	
	@Autowired
	private TutorRepository tutorRepository;

	@Autowired
	private UserService userService;

	public List<Document> listAll() {
		return documentRepository.findAll();
	}


	public void storeFile(MultipartFile file, Long typeId, User auth) throws StorageException {
		if(auth.getRole().getName().equals(RolesNames.APPRENTICE)) {
			Apprentice apprentice = userService.getApprentice(auth);
			String path = storageService.storeFile(file, rootLocation);
			Document document = new Document();
			String rawFilename = file.getOriginalFilename();
			int pos = rawFilename.lastIndexOf(".");
			document.setName(pos > 0 ? rawFilename.substring(0, pos) : rawFilename);
			document.setCreation(new Date());
			document.setPath(path);
			DocumentType type = documentTypeRepository.findOne(typeId);
			document.setType(type);
			document.setApprentice(apprentice);
			documentRepository.save(document);
		}
	}

	public File getFile(Long documentId, User auth) throws StorageException {
		if(auth.getRole().getName().equals(RolesNames.APPRENTICE)) {
			Apprentice apprentice = userService.getApprentice(auth);
			Document doc = documentRepository.findByApprenticeIdAndId(apprentice.getId(), documentId);
			if (doc != null) {
				return storageService.getFile(doc.getPath());
			}
		} else if(auth.getRole().getName().equals(RolesNames.TUTOR)){
			Document doc = documentRepository.findOne(documentId);
			Tutor tutor = tutorRepository.findByUser(auth);
			if(tutor.getApprentices().contains(doc.getApprentice())){
				return storageService.getFile(doc.getPath());
			}
		}
		throw new StorageException(String.format("You can't access this document : %d", documentId));
		
	}

	public Document deleteFile(Long fileId) throws StorageException {
		Document doc = documentRepository.findOne(fileId);
		storageService.deleteFile(doc.getPath());
		documentRepository.delete(doc);
		return doc;
	}
}
