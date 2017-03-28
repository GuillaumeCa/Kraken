package com.kraken.gcfa.controller;

import com.kraken.gcfa.dto.LDAPUserDTO;
import com.kraken.gcfa.services.LDAPService;
import com.kraken.gcfa.services.LDAPServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Guillaume on 22/03/2017.
 * gcfa-back
 */
@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private LDAPService ldapService;

    @RequestMapping(value = "/{user}/{pwd}")
    public LDAPUserDTO getUser(@PathVariable String user, @PathVariable String pwd) throws LDAPServiceException {
        return ldapService.getUser(user, pwd);
    }
}
