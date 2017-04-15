package com.kraken.gcfa.services;

import com.kraken.gcfa.exceptions.StorageException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by Guillaume on 11/04/2017.
 * gcfa-back
 */
@Service
public class StorageService {

    private final Logger LOG = LoggerFactory.getLogger(StorageService.class);


    public String storeFile(MultipartFile file, Path rootPath) throws StorageException {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }
            Path path = rootPath.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), path);
            LOG.info("The file {} has been successfully written on {}", file.getOriginalFilename(), path.toString());
            return path.toString();
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + file.getOriginalFilename() + ", reason: " + e.getCause());
        }
    }

    public File getFile(String filename){
        Path path = Paths.get(filename);
        LOG.info("Searching the file at {}", path.toString());
        File file = new File(path.toString());
        return file;
    }

    public void deleteFile(String filePath) throws StorageException {
        Path path = Paths.get(filePath);
        try {
            Files.delete(path);
        } catch (IOException e) {
            throw new StorageException(String.format("The file %s cannot be deleted", path.toString()));
        }
    }
}
