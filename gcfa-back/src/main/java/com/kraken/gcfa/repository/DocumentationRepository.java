package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.Documentation;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Guillaume on 10/04/2017.
 * gcfa-back
 */
public interface DocumentationRepository extends CrudRepository<Documentation, Long> {
    List<Documentation> findAll();
}
