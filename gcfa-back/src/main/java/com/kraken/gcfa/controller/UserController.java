package com.kraken.gcfa.controller;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.FormApprenticeDTO;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
@RestController
@RequestMapping(value = "/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    @RolesAllowed(RolesNames.APPRENTICE)
    public User getUser(@AuthenticationPrincipal User auth) {
        return auth;
    }

    @GetMapping("/me/detail")
    @RolesAllowed(RolesNames.APPRENTICE)
    public Apprentice getApprentice(@AuthenticationPrincipal User user) {
        return userService.getApprentice(user);
    }

    @PostMapping("/apprentice")
    @RolesAllowed(RolesNames.APPRENTICE)
    public Apprentice createApprentice(@RequestBody FormApprenticeDTO form) throws Exception {
        return userService.createApprentice(form);
    }

}
