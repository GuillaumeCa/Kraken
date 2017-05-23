package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
public interface UserRepository extends CrudRepository<User, Long> {

    User findByToken(String token);

    User findByLdapId(String ldapId);

    User findByEmailAndPassword(String email, String password);

    User findByEmail(String email);
    
    @Query("FROM User "
            + "WHERE role_id = ?1 "
            + "AND (first_name like %?2% "
            + "OR last_name like %?2%)")
    List<User> searchUser(Integer roleId, String search);
}
