package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Guillaume on 17/04/2017.
 * gcfa-back
 */
public interface ApprenticeRepository extends CrudRepository<Apprentice, Long> {
    Apprentice findByUser(User user);
    List<Apprentice> findAll();
}
