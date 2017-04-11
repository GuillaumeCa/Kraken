package com.kraken.gcfa.services;

import com.kraken.gcfa.entity.Documentation;
import com.kraken.gcfa.entity.DocumentationType;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.repository.DocumentationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.SocketTimeoutException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 10/04/2017.
 * gcfa-back
 */
@Service
public class DocumentationService {

    private final String DOCUMENTATION_FOLDER = "files/documentation";

    private final Path rootLocation = Paths.get(DOCUMENTATION_FOLDER);

    @Autowired
    private StorageService storageService;

    @Autowired
    private DocumentationRepository documentationRepository;

    public List<Documentation> listAll() {
        return documentationRepository.findAll();
    }

    public void storeFile(MultipartFile file, DocumentationType type) throws StorageException {
        String path = storageService.storeFile(file, rootLocation);

        Documentation documentation = new Documentation();
        documentation.setName(file.getName());
        documentation.setCreation(new Date());
        documentation.setPath(path);
        documentation.setType(type);
        documentationRepository.save(documentation);
    }

    public File getFile(Long fileId) throws StorageException {
        Documentation doc = documentationRepository.findOne(fileId);
        if (doc != null) {
            return storageService.getFile(doc.getPath());
        } else {
            throw new StorageException(String.format("The file with id %d was not found", fileId));
        }
    }
}
