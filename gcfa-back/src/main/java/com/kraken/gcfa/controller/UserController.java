package com.kraken.gcfa.controller;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.FormApprenticeDTO;
import com.kraken.gcfa.dto.FormTutorDTO;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.services.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

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
	 *
	 * @param auth
	 * @return
	 */
	@GetMapping("/me")
	public User getUser(@AuthenticationPrincipal User auth) {
		return auth;
	}

	/**
	 * @param user
	 * @return
	 */
	@GetMapping("/me/detail")
	public ResponseEntity getUserProfil(@AuthenticationPrincipal User user) {
		switch (user.getRole().getName()) {
			case RolesNames.APPRENTICE:
				return new ResponseEntity<>(userService.getApprentice(user), HttpStatus.OK);
			case RolesNames.TUTOR:
				return new ResponseEntity<>(userService.getTutor(user), HttpStatus.OK);
			case RolesNames.SUPER_ADMIN:
				return new ResponseEntity<>(user, HttpStatus.OK);
			case RolesNames.CONSULTANT:
				return new ResponseEntity<>(user, HttpStatus.OK);
			default:
				return new ResponseEntity<>(user, HttpStatus.OK);
		}
	}

	@PostMapping("/apprentice")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Apprentice createApprentice(@RequestBody FormApprenticeDTO form) throws Exception {
		return userService.createApprentice(form);
	}

	@DeleteMapping("/apprentice")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public boolean deleteApprentice(@AuthenticationPrincipal User user) throws Exception {
		switch (user.getRole().getName()) {
			case RolesNames.APPRENTICE:
				userService.deleteApprentice(user);
				return true;
			default:
				return false;
		}
	}

	@PutMapping("/apprentice")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Apprentice updateApprentice(FormApprenticeDTO form) throws Exception {
		return userService.updateApprentice(form);
	}

	@GetMapping("/tutor/detail")
	@RolesAllowed(RolesNames.TUTOR)
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

	@GetMapping("/tutor")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public boolean deleteTutor(@AuthenticationPrincipal User user) throws Exception {
		switch (user.getRole().getName()) {
			case RolesNames.TUTOR:
				userService.deleteTutor(user);
				return true;
			default:
				return false;
		}
	}

	@GetMapping("/apprentices")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public List<Apprentice> getListApprentice() {
		return userService.getApprentices();
	}

	@GetMapping("/tutor/apprentice")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public List<Apprentice> getApprenticeFromTutor(Long tutorId) throws NotFoundException {
		Tutor tutor = userService.getTutor(tutorId);
		if (tutor != null) {
			return userService.getApprenticeFromTutor(tutor.getUser());
		}
		throw new NotFoundException("Tutor not found");
	}

}
