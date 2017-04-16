package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.Role;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Guillaume on 16/04/2017.
 * gcfa-back
 */
public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByName(String name);
}
