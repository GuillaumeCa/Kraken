package com.kraken.gcfa.repository;

import java.util.List;

import com.kraken.gcfa.entity.ContractType;
import org.springframework.data.repository.CrudRepository;

import com.kraken.gcfa.entity.Document;
import com.kraken.gcfa.entity.DocumentType;


public interface DocumentTypeRepository extends CrudRepository<DocumentType, Long> {

    List<DocumentType> findAll();

    List<DocumentType> findByContract(ContractType contract);

}
