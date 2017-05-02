package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by Guillaume on 17/04/2017.
 * gcfa-back
 */
public interface TutorRepository extends CrudRepository<Tutor, Long> {
	Tutor findByUser(User user);
}
