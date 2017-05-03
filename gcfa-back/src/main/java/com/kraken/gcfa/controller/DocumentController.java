package com.kraken.gcfa.controller;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

@RestController
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    /**
     * Publier une document
     *
     * @param file
     * @param typeId
     * @throws StorageException
     */
    @PostMapping(value = "/{typeId}")
    public void upload(@RequestParam("file") MultipartFile file, @PathVariable Long typeId, @AuthenticationPrincipal User auth) throws StorageException {
        documentService.storeFile(file, typeId, auth);
    }

    /**
     * Récupérer un document avec son apprenticeId
     *
     * @param documentId
     * @param response
     * @return
     * @throws StorageException
     */
    @GetMapping(value = "/{documentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public FileSystemResource getFile(@PathVariable Long documentId, HttpServletResponse response, @AuthenticationPrincipal User auth) throws StorageException {
        File file = documentService.getFile(documentId, auth);
        response.addHeader("Access-Control-Expose-Headers", "x-filename");
        response.addHeader("x-filename", file.getName());
        return new FileSystemResource(file);
    }

    /**
     * Supprimer une document
     *
     * @param documentId
     * @throws StorageException
     */
    @DeleteMapping("/{documentId}")
    @RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.APPRENTICE})
    public void deleteFile(@PathVariable Long documentId, @AuthenticationPrincipal User auth) throws StorageException {
        documentService.deleteFile(documentId, auth);
    }
}
