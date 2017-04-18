package com.kraken.gcfa.controller;

import java.io.File;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.services.DocumentService;

@RestController
@RequestMapping("/document")
@CrossOrigin("*")
public class DocumentController {
	
	@Autowired
    private DocumentService documentService;
	
	/**
     * Récupérer un document avec son apprenticeId
     *
     * @param apprenticeId
     * @param response
     * @return
     * @throws StorageException
     */
    @GetMapping(value = "/{apprenticeId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public FileSystemResource getFile(@PathVariable Long apprenticeId, HttpServletResponse response) throws StorageException {
        File file = documentService.getFile(apprenticeId);
        response.addHeader("Access-Control-Expose-Headers", "x-filename");
        response.addHeader("x-filename", file.getName());
        return new FileSystemResource(file);
    }
}
