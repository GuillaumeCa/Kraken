package com.kraken.gcfa.controller;

import com.kraken.gcfa.dto.form.FormLoginDTO;
import com.kraken.gcfa.dto.LDAPUserDTO;
import com.kraken.gcfa.services.AuthService;
import com.kraken.gcfa.services.LDAPService;
import com.kraken.gcfa.exceptions.LDAPServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Guillaume on 22/03/2017.
 * gcfa-back
 */
@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private LDAPService ldapService;

    @Autowired
    private AuthService authService;

    /**
     * Test du LDAP
     */
    @RequestMapping(value = "/{user}/{pwd}")
    public LDAPUserDTO getUser(@PathVariable String user, @PathVariable String pwd) throws LDAPServiceException {
        return ldapService.getUser(user, pwd);
    }

    /**
     * Test de la connexion
     *
     * @param form
     * @return
     * @throws Exception
     */
    @PostMapping
    public String login(@RequestBody FormLoginDTO form) throws Exception {
        // TODO: générer token si l'utilisateur n'est pas dans la bdd mais sur le LDAP
        return authService.generateToken(form);
    }
}
