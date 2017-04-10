package com.kraken.gcfa.controller;

import com.kraken.gcfa.dto.FormLoginDTO;
import com.kraken.gcfa.dto.LDAPUserDTO;
import com.kraken.gcfa.services.LDAPService;
import com.kraken.gcfa.services.LDAPServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Created by Guillaume on 22/03/2017.
 * gcfa-back
 */
@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private LDAPService ldapService;

    /**
     * Test du LDAP
     */
    @RequestMapping(value = "/{user}/{pwd}")
    public LDAPUserDTO getUser(@PathVariable String user, @PathVariable String pwd) throws LDAPServiceException {
        return ldapService.getUser(user, pwd);
    }

    @PostMapping
    public String login(@RequestBody FormLoginDTO form) {
        // TODO: générer token si l'utilisateur n'est pas dans la bdd mais sur le LDAP
        return UUID.randomUUID().toString();
    }
}
