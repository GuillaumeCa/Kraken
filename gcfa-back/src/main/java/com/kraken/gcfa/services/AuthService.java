package com.kraken.gcfa.services;

import com.kraken.gcfa.dto.FormLoginDTO;
import com.kraken.gcfa.dto.LDAPUserDTO;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.repository.RoleRepository;
import com.kraken.gcfa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    private RoleRepository roleRepository;

    @Autowired
    private LDAPService ldapService;

    private final int EXPIRATION_TOKEN_DURATION = 2 * 60 * 60 * 1000;

    public String generateToken(FormLoginDTO login) throws Exception {


        // ldapService.getUser(login.getUsername(), login.getPassword());

        String searchBasicUser = basicLogin(login);
        if (searchBasicUser != null) {
            return searchBasicUser;
        }

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
            user = updateTokenExpiration(user);
            userRepository.save(user);
            return token;
        } else {
            // TODO: remove and replace with csv import
            User userCreated = ldapService.createUserFromLDAP(ldapUser);
            userCreated.setToken(token);
            userCreated = updateTokenExpiration(userCreated);
            userRepository.save(userCreated);
            return token;
            //throw new Exception("L'utilisateur est inconnu");
        }
    }

    public String basicLogin(FormLoginDTO form) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(form.getPassword());
        User user = userRepository.findByEmailAndPassword(form.getUsername(), hashedPassword);
        if (user != null) {
            String token = UUID.randomUUID().toString();
            user = updateTokenExpiration(user);
            user.setToken(token);
            userRepository.save(user);
            return token;
        }
        return null;
    }

    public User updateTokenExpiration(User user) {
        Date exp = new Date(new Date().getTime() + EXPIRATION_TOKEN_DURATION);
        user.setTokenExpiration(exp);
        return user;
    }

    public boolean isTokenExpired(User user) {
        if (user == null) return false;
        Date exp = user.getTokenExpiration();
        return exp.before(new Date());
    }

}
