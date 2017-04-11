package com.kraken.gcfa.controller;

import com.kraken.gcfa.entity.Documentation;
import com.kraken.gcfa.entity.DocumentationType;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.services.DocumentationService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
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
    private void upload(@RequestParam("file") MultipartFile file, @RequestParam("type") DocumentationType type) throws StorageException {
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
    @GetMapping("/{fileId}")
    private void getFile(@PathVariable Long fileId, HttpServletResponse response) throws StorageException, IOException {
        File file = documentationService.getFile(fileId);
        InputStream fstream;
        try {
            fstream = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            throw new StorageException(String.format("The file %s was not found", file.getPath()));
        }
        String contentType = URLConnection.guessContentTypeFromName(file.getName());
        response.setContentType(contentType);
        IOUtils.copy(fstream, response.getOutputStream());
    }

}
