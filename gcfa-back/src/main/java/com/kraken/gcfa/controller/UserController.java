package com.kraken.gcfa.controller;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.FormApprenticeDTO;
import com.kraken.gcfa.dto.FormTutorDTO;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Affiche les infos de l'utilisateur connecté
     * @param auth
     * @return
     */
    @GetMapping("/me")
    public User getUser(@AuthenticationPrincipal User auth) {
        return auth;
    }

    /**
     *
     * @param user
     * @return
     */
    @GetMapping("/me/detail")
    public ResponseEntity getApprentice(@AuthenticationPrincipal User user) {
        switch (user.getRole().getName()) {
            case RolesNames.APPRENTICE:
                return new ResponseEntity<>(userService.getApprentice(user), HttpStatus.OK);
            default:
                return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @PostMapping("/apprentice")
    @RolesAllowed(RolesNames.SUPER_ADMIN)
    public Apprentice createApprentice(@RequestBody FormApprenticeDTO form) throws Exception {
        return userService.createApprentice(form);
    }

    @PutMapping("/apprentice")
    @RolesAllowed(RolesNames.SUPER_ADMIN)
    public Apprentice updateApprentice(FormApprenticeDTO form) throws Exception {
        return userService.updateApprentice(form);
    }
    
    @GetMapping("/tutor/detail")
    public ResponseEntity getTutor(@AuthenticationPrincipal User user) {
        switch (user.getRole().getName()) {
            case RolesNames.TUTOR:
                return new ResponseEntity<>(userService.getTutor(user), HttpStatus.OK);
            default:
                return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @PostMapping("/tutor")
    @RolesAllowed(RolesNames.SUPER_ADMIN)
    public Tutor createTutor(FormTutorDTO form) throws Exception {
        return userService.createTutor(form);
    }

    @PutMapping("/tutor")
    @RolesAllowed(RolesNames.SUPER_ADMIN)
    public Tutor updateTutor(FormTutorDTO form) throws Exception {
        return userService.updateTutor(form);
    }


}
