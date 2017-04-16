package com.kraken.gcfa.controller;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
@RestController
@RequestMapping(value = "/user")
@CrossOrigin("*")
public class UserController {

    @GetMapping("/me")
    @RolesAllowed(RolesNames.APPRENTICE)
    public User getUser(@AuthenticationPrincipal User auth) {
        return auth;
    }

}
