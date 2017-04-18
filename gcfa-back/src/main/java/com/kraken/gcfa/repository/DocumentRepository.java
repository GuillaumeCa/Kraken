package com.kraken.gcfa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.kraken.gcfa.entity.Document;


public interface DocumentRepository extends CrudRepository<Document, Long> {
    List<Document> findAll();
    
    Document findByApprenticeId(Long apprenticeId);
}
