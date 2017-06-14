package com.kraken.gcfa.controller;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.form.FormApprenticeDTO;
import com.kraken.gcfa.dto.form.FormConsultantDTO;
import com.kraken.gcfa.dto.form.FormTutorDTO;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.services.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

import java.util.ArrayList;
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

	@DeleteMapping("/apprentice/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteApprentice(@PathVariable Long id) throws Exception {
		userService.deleteApprentice(id);
	}

	@PutMapping("/apprentice")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Apprentice updateApprentice(@RequestBody FormApprenticeDTO form) throws Exception {
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

	@GetMapping("/tutor/{id}")
	@RolesAllowed({RolesNames.SUPER_ADMIN,RolesNames.CONSULTANT,RolesNames.TUTOR})
	public Tutor getTutor(@PathVariable Long id) {
		return userService.getTutor(id);
	}

	@PutMapping("/tutor/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Tutor updateTutor(@PathVariable Long id, @RequestBody FormTutorDTO form) throws Exception {
		return userService.updateTutor(id, form);
	}

	@PostMapping("/tutor")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Tutor createTutor(@RequestBody FormTutorDTO form) throws Exception {
		return userService.createTutor(form);
	}

	@DeleteMapping("/tutor/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteTutor(@PathVariable Long id) throws Exception {
		userService.deleteTutor(id);
	}

	@GetMapping("/tutors")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT,RolesNames.TUTOR})
	public List<Tutor> getAllTutor() {
		List<Tutor> tutors = userService.getTutors();
		if (tutors.equals(null)) {
			tutors = new ArrayList<Tutor>();
		}
		return tutors;
	}

	@GetMapping("/apprentices")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT, RolesNames.TUTOR})
	public List<Apprentice> getListApprentice() {
		List<Apprentice> apprentices = userService.getApprentices();
		if (apprentices.equals(null)) {
			apprentices = new ArrayList<Apprentice>();
		}
		return apprentices;
	}

	@GetMapping("/tutor/apprentices/{tutorId}")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT, RolesNames.TUTOR})
	public List<Apprentice> getApprenticesFromTutor(@PathVariable Long tutorId) throws NotFoundException {
		Tutor tutor = userService.getTutor(tutorId);
		List<Apprentice> apprentices = userService.getApprentices();
		if (tutor != null) {
			apprentices = userService.getApprenticesFromTutor(tutor);
			if (apprentices.equals(null)) {
				apprentices = new ArrayList<Apprentice>();
			}
			return apprentices;
		} 
		throw new NotFoundException("Tutor not found");
	}
	
	@GetMapping("/apprentice/search/{search}")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT, RolesNames.TUTOR})
	public List<Apprentice> searchApprentice(@PathVariable String search) throws NotFoundException {
		List<User> users =  userService.searchUser(1L, search);
		List <Apprentice> apprentices = userService.getApprenticesFromUsers(users);
		if (apprentices.equals(null)) {
			apprentices = new ArrayList<Apprentice>();
		}
		return userService.getApprenticesFromUsers(users);
	}

	@GetMapping("/apprentice/{id}")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT, RolesNames.TUTOR})
	public Apprentice getApprentice(@PathVariable Long id) {
		return userService.getApprentice(id);
	}
	
	@GetMapping("/tutor/search/{search}")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT})
	public List<Tutor> searchTutor(@PathVariable String search) throws NotFoundException {
		List<User> users = userService.searchUser(2L, search);
		List<Tutor> tutors;
		if (users.equals(null) || users.size()==0) {
			tutors = new ArrayList<Tutor>();
		}
		else {
			tutors = userService.getTutorsFromUsers(users);
			if (tutors.equals(null)) {
				tutors = new ArrayList<Tutor>();
			}
		}
		return tutors;
	}
	
	@GetMapping("/consultant/search/{search}")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT})
	public List<User> searchConsultant(@PathVariable String search) throws NotFoundException {
		List<User> users = userService.searchUser(3L, search);
		if (users.equals(null)) {
			users = new ArrayList<User>();
		}
		return users;
	}

	@GetMapping("/consultants")
	@RolesAllowed({RolesNames.SUPER_ADMIN,RolesNames.CONSULTANT})
	public List<User> getConsultants() {
		List<User> users = userService.getConsultants();
		if (users.equals(null)) {
			users = new ArrayList<User>();
		}
		return users;
	}

	@GetMapping("/consultant/{id}")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT})
	public User getConsultant(@PathVariable Long id) throws NotFoundException {
		return userService.getConsultant(id);
	}

	@PutMapping("/consultant/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public User updateConsultant(@PathVariable Long id, @RequestBody FormConsultantDTO form) {
		return userService.updateConsultant(id, form);
	}

	@DeleteMapping("/consultant/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteConsultant(@PathVariable Long id) {
		userService.deleteConsultant(id);
	}

	@PostMapping("/consultant")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public User createConsultant(@RequestBody FormConsultantDTO form) throws Exception {
		return userService.createConsultant(form);
	}

	@PutMapping("/modifPassword/{password}")
	@RolesAllowed({RolesNames.SUPER_ADMIN, RolesNames.CONSULTANT, RolesNames.TUTOR})
	public void modifyPassword(@PathVariable String password, @AuthenticationPrincipal User auth) {
		userService.modifPassword(password, auth);
	}
}
