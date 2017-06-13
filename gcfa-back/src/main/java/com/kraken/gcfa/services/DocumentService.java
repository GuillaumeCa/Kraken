package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.form.FormDocumentTypeDTO;
import com.kraken.gcfa.entity.*;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.repository.DocumentRepository;
import com.kraken.gcfa.repository.DocumentTypeRepository;
import com.kraken.gcfa.repository.TutorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

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
		if (auth.getRole().getName().equals(RolesNames.APPRENTICE)) {

			Apprentice apprentice = userService.getApprentice(auth);

			String rawFilename = file.getOriginalFilename();
			String fileType = storageService.getFiletype(rawFilename);
			if (!storageService.hasExtensions(rawFilename, Collections.singletonList(".pdf"))) {
				throw new StorageException(String.format("The file Type %s is not expected ", fileType));
			}

			String path = storageService.storeFile(file, rootLocation);

			Document document;
			document = documentRepository.findByApprenticeIdAndTypeId(apprentice.getId(), typeId);

			if (document == null) {
				document = new Document();
				DocumentType type = documentTypeRepository.findOne(typeId);
				document.setType(type);
			}
			document.setName(storageService.getFilename(rawFilename));

			document.setCreation(new Date());
			document.setPath(path);
			document.setApprentice(apprentice);
			document.setFileType(fileType);
			documentRepository.save(document);
		}
	}

	public File getFile(Document doc) throws StorageException {
		return storageService.getFile(doc.getPath());
	}

	public boolean hasRole(User user, String role) {
		return user.getRole().getName().equals(role);
	}

	public Document getDocument(Long documentId, User auth) throws StorageException {
		if (hasRole(auth, RolesNames.APPRENTICE)) {
			Apprentice apprentice = userService.getApprentice(auth);
			Document doc = documentRepository.findByApprenticeIdAndId(apprentice.getId(), documentId);
			if (doc != null) {
				return doc;
			}
		} else if (hasRole(auth, RolesNames.TUTOR)) {
			Document doc = documentRepository.findOne(documentId);
			Tutor tutor = tutorRepository.findByUser(auth);
			if (tutor.getApprentices().contains(doc.getApprentice())) {
				return doc;
			}
		} else if (hasRole(auth, RolesNames.SUPER_ADMIN) || hasRole(auth, RolesNames.CONSULTANT)) {
			return documentRepository.findOne(documentId);
		}
		throw new StorageException(String.format("You can't access this document : %d", documentId));
	}

	public void deleteFile(Long documentId, User auth) throws StorageException {
		Document doc = null;
		if (auth.getRole().getName().equals(RolesNames.SUPER_ADMIN)) {
			doc = documentRepository.findOne(documentId);
		} else if (auth.getRole().getName().equals(RolesNames.APPRENTICE)) {
			Apprentice apprentice = userService.getApprentice(auth);
			doc = documentRepository.findByApprenticeIdAndId(apprentice.getId(), documentId);
		}
		storageService.deleteFile(doc.getPath());
		documentRepository.delete(doc);
	}

	public List<DocumentType> getDueDocuments(User user) {
		Apprentice apprentice = userService.getApprentice(user);
		List<Document> documents = documentRepository.findByApprentice(apprentice);
		List<DocumentType> listDocumentTypes = documentTypeRepository.findByContract(apprentice.getContractType());
		for (Document document : documents) {
			if (listDocumentTypes.contains(document.getType())) {
				listDocumentTypes.remove(document.getType());
			}
		}
//		listDocumentTypes.sort((a, b) -> {
//			Calendar c1 = Calendar.getInstance();
//			c1.set(a.getYear(), a.getMonth(), a.getDay());
//
//			Calendar c2 = Calendar.getInstance();
//			c2.set(b.getYear(), b.getMonth(), b.getDay());
//			return c1.getTime().compareTo(c2.getTime());
//		});
		listDocumentTypes = orderDocumentTypes(listDocumentTypes);
		return listDocumentTypes;
	}


	private List<DocumentType> orderDocumentTypes(List<DocumentType> docs) {
		docs.sort((a, b) -> {
			Calendar c1 = Calendar.getInstance();
			c1.set(a.getYear(), a.getMonth(), a.getDay());

			Calendar c2 = Calendar.getInstance();
			c2.set(b.getYear(), b.getMonth(), b.getDay());
			return c1.getTime().compareTo(c2.getTime());
		});
		return docs;
	}

	public List<Document> getDocuments(User auth) {
		Apprentice apprentice = userService.getApprentice(auth);
		return documentRepository.findByApprentice(apprentice);
	}

	public List<Document> getDocumentsFromUser(Long userId) {
		User user = userService.getUserById(userId);
	 	return getDocuments(user);
	}

    public List<DocumentType> getDocumentTypes() {
        return orderDocumentTypes(documentTypeRepository.findAll());
    }

	public DocumentType getDocumentType(Long id) {
		return documentTypeRepository.findOne(id);
	}

	public DocumentType createDocumentType(FormDocumentTypeDTO form) {
		DocumentType doc = new DocumentType();
		updateDocumentType(doc, form);
		return documentTypeRepository.save(doc);
	}

	private void updateDocumentType(DocumentType doc, FormDocumentTypeDTO form) {
		doc.setName(form.getName());
		doc.setContract(form.getContract());
		doc.setDay(form.getDay());
		doc.setMonth(form.getMonth());
		doc.setYear(form.getYear());
	}

	public void deleteDocumentType(Long id) {
		documentTypeRepository.delete(id);
	}

	public DocumentType updateDocumentType(Long id, FormDocumentTypeDTO form) {
		DocumentType doc = documentTypeRepository.findOne(id);
		updateDocumentType(doc, form);
		return documentTypeRepository.save(doc);
	}
}
