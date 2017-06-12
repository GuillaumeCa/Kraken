package com.kraken.gcfa.services;

import com.kraken.gcfa.dto.form.FormLoginDTO;
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
    private LDAPService ldapService;

    private final int EXPIRATION_TOKEN_DURATION = 2 * 60 * 60 * 1000;

    public String generateToken(FormLoginDTO login) throws Exception {

    	
    	LDAPUserDTO ldapUser;
    	User user = null;
    	try {	
	    	ldapUser = ldapService.getUser(login.getUsername(), login.getPassword());
	        /*
	        LDAPUserDTO ldapUser = new LDAPUserDTO();
	        ldapUser.setPrenom("Jean");
	        ldapUser.setNomFamille("Dupont");
	        ldapUser.setMail("jean.dupont@isep.fr");
	        ldapUser.setEmployeeNumber("1234");
	         */
    	}catch (Exception e) {
	        String searchBasicUser = basicLogin(login);
	        if (searchBasicUser != null) {
	            return searchBasicUser;
	        }

            ldapUser = new LDAPUserDTO();
//	        ldapUser.setPrenom("Jean");
//	        ldapUser.setNomFamille("Dupont");
//	        ldapUser.setMail("jean.dupont@isep.fr");
//	        ldapUser.setEmployeeNumber("1234");
    	}

        user = userRepository.findByLdapId(ldapUser.getEmployeeNumber());

        String token = UUID.randomUUID().toString();
        if (user != null) {
            user.setToken(token);
            user = updateTokenExpiration(user);
            userRepository.save(user);
            return token;
        } else {
        	throw new Exception("L'utilisateur est inconnu");
        }
    }

    public String basicLogin(FormLoginDTO form) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = userRepository.findByEmail(form.getUsername());
        
        if (user != null && passwordEncoder.matches(form.getPassword(), user.getPassword())) {
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
        userRepository.save(user);
        return user;
    }

    public boolean isTokenExpired(User user) {
        if (user == null) return false;
        Date exp = user.getTokenExpiration();
        return exp.before(new Date());
    }

}
