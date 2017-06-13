package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Guillaume on 17/04/2017.
 * gcfa-back
 */
public interface TutorRepository extends CrudRepository<Tutor, Long> {

	Tutor findByUser(User user);

	@Query("FROM Tutor as t JOIN t.user as u WHERE u.email=?1")
	Tutor findTutorByEmail(String email);

	List<Tutor> findAll();

	List<Tutor> findByUserIn(List<User> users);
}
