package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.entity.Document;
import com.kraken.gcfa.entity.DocumentType;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.repository.DocumentRepository;

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

    public List<Document> listAll() {
        return documentRepository.findAll();
    }

   public void storeFile(MultipartFile file, DocumentType type) throws StorageException {
        String path = storageService.storeFile(file, rootLocation);

        Document document = new Document();

        String rawFilename = file.getOriginalFilename();
        int pos = rawFilename.lastIndexOf(".");
        document.setName(pos > 0 ? rawFilename.substring(0, pos) : rawFilename);

        document.setCreation(new Date());
        document.setPath(path);
        document.setType(type);
        documentRepository.save(document);
    }

    public File getFile(Long apprenticeId) throws StorageException {
    	
	        Document doc = documentRepository.findByApprenticeId(apprenticeId);
	        if (doc != null) {
	            return storageService.getFile(doc.getPath());
	        } else {
	            throw new StorageException(String.format("The file with id %d was not found", apprenticeId));
	        }
    }

    public Document deleteFile(Long fileId) throws StorageException {
        Document doc = documentRepository.findOne(fileId);
        storageService.deleteFile(doc.getPath());
        documentRepository.delete(doc);
        return doc;
    }
}
