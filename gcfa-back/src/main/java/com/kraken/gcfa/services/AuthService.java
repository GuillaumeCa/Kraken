package com.kraken.gcfa.services;

import com.kraken.gcfa.dto.FormLoginDTO;
import com.kraken.gcfa.dto.LDAPUserDTO;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Created by Guillaume on 16/04/2017.
 * gcfa-back
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LDAPService ldapService;

    public String generateToken(FormLoginDTO login) throws Exception {
        // ldapService.getUser(login.getUsername(), login.getPassword());
        /*
            TODO: replace with proper implementation of ldap query for user, currently faked
         */
        LDAPUserDTO ldapUser = new LDAPUserDTO();
        ldapUser.setPrenom("Jean");
        ldapUser.setNomFamille("Dupont");
        ldapUser.setMail("jean.dupont@isep.fr");
        ldapUser.setEmployeeNumber("1234");

        User user = userRepository.findByLdapId(ldapUser.getEmployeeNumber());
        String token = UUID.randomUUID().toString();
        if (user != null) {
            user.setToken(token);
            userRepository.save(user);
            return token;
        } else {
            User userCreated = ldapService.createUserFromLDAP(ldapUser);
            userCreated.setToken(token);
            userRepository.save(userCreated);
            return token;
            //throw new Exception("L'utilisateur est inconnu");
        }
    }

}
