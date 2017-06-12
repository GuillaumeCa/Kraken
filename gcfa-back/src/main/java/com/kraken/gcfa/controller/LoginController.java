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
    private AuthService authService;

    /**
     * Connexion et récupération d'un token
     *
     * @param form
     * @return
     * @throws Exception
     */
    @PostMapping
    public String login(@RequestBody FormLoginDTO form) throws Exception {
        return authService.generateToken(form);
    }
}
