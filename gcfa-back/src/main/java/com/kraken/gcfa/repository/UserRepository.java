package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
public interface UserRepository extends CrudRepository<User, Long> {

    User findByToken(String token);

    User findByLdapId(String ldapId);
}
