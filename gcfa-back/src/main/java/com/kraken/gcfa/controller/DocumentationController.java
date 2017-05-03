package com.kraken.gcfa.controller;

import com.kraken.gcfa.entity.Documentation;
import com.kraken.gcfa.entity.DocumentationType;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.services.DocumentationService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
import java.nio.file.*;
import java.util.List;

/**
 * Created by Guillaume on 10/04/2017.
 * gcfa-back
 */
@RestController
@RequestMapping("/documentation")
public class DocumentationController {

    @Autowired
    private DocumentationService documentationService;

    /**
     * Récupérer la liste des documentations
     *
     * @return
     */
    @GetMapping
    private List<Documentation> getAll() {
        return documentationService.listAll();
    }

    /**
     * Publier une documentation
     *
     * @param file
     * @param type
     * @throws StorageException
     */
    @PostMapping
    public void upload(@RequestParam("file") MultipartFile file, @RequestParam("type") DocumentationType type) throws StorageException {
        documentationService.storeFile(file, type);
    }

    /**
     * Récupérer une documentation avec son id
     *
     * @param fileId
     * @param response
     * @return
     * @throws StorageException
     */
    @GetMapping(value = "/{fileId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public FileSystemResource getFile(@PathVariable Long fileId, HttpServletResponse response) throws StorageException {
        File file = documentationService.getFile(fileId);
        response.addHeader("Access-Control-Expose-Headers", "x-filename");
        response.addHeader("x-filename", file.getName());
        return new FileSystemResource(file);
    }

    /**
     * Remplacer une documentation par une autre
     *
     * @param file
     * @param fileId
     * @throws StorageException
     */
    @PutMapping("/{fileId}")
    public void editFile(@RequestParam("file") MultipartFile file, @PathVariable Long fileId) throws StorageException {
        Documentation doc = documentationService.deleteFile(fileId);
        documentationService.storeFile(file, doc.getType());
    }

    /**
     * Supprimer une documentation
     *
     * @param fileId
     * @throws StorageException
     */
    @DeleteMapping("/{fileId}")
    public void deleteFile(@PathVariable Long fileId) throws StorageException {
        documentationService.deleteFile(fileId);
    }

}
