package com.kraken.gcfa.services;

import com.kraken.gcfa.entity.Documentation;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.repository.DocumentationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    private final Logger LOG = LoggerFactory.getLogger(DocumentationService.class);

    private final String DOCUMENTATION_FOLDER = "files/documentation";

    private final Path rootLocation = Paths.get(DOCUMENTATION_FOLDER);

    @Autowired
    private DocumentationRepository documentationRepository;

    public List<Documentation> listAll() {
        return documentationRepository.findAll();
    }

    public void storeFile(MultipartFile file) throws StorageException {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }
            Path path = this.rootLocation.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), path);

            Documentation documentation = new Documentation();
            documentation.setName(file.getOriginalFilename());
            documentation.setCreation(new Date());
            documentation.setPath(path.toString());
            documentationRepository.save(documentation);

            LOG.info("The file {} has been successfully written on {}", file.getOriginalFilename(), path.toString());

        } catch (IOException e) {
            throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }
}
