package com.kraken.gcfa.controller;

import com.kraken.gcfa.entity.Documentation;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.services.DocumentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping
    private List<Documentation> getAll() {
        return documentationService.listAll();
    }

    @PostMapping
    private void upload(@RequestParam("file") MultipartFile file) throws StorageException {
        documentationService.storeFile(file);
    }

}
