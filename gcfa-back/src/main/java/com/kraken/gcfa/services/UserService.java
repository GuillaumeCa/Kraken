package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.form.FormApprenticeDTO;
import com.kraken.gcfa.dto.form.FormConsultantDTO;
import com.kraken.gcfa.dto.form.FormTutorDTO;
import com.kraken.gcfa.entity.*;
import com.kraken.gcfa.repository.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
@Service
public class UserService {

    @Autowired
    private ApprenticeRepository apprenticeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private CompanySiteRepository companySiteRepository;

    @Autowired
    private RoleRepository roleRepository;


    public Apprentice getApprentice(User user) {
        return apprenticeRepository.findByUser(user);
    }
    
    public List<Apprentice> getApprenticesFromTutor(User user) {
    	Tutor tutor = tutorRepository.findByUser(user);    	
        return tutor.getApprentices();
    }
    
    public List<User> searchUser(Long roleId, String search) {
    	return userRepository.searchUser(roleId, search);
    }

    public Apprentice createApprentice(FormApprenticeDTO form) throws Exception {
        User user = userRepository.findOne(form.getUserId());

        if (user.getRole().getName().equals(RolesNames.APPRENTICE)) {
            Apprentice apprentice = new Apprentice();
        	updateApprenticeInformations(apprentice, form);
            return apprentice;
        } else {
            throw new Exception("The user with id " + user.getId() + " is not an apprentice");
        }
    }
    
    public void deleteApprentice(Long id) {
    	apprenticeRepository.delete(id);
    }

    public Apprentice updateApprentice(FormApprenticeDTO form) throws Exception {
        User user = userRepository.findOne(form.getUserId());
        Apprentice apprentice;

        if (user.getRole().getName().equals(RolesNames.APPRENTICE)) {
        	apprentice = getApprentice(user);
        	updateApprenticeInformations(apprentice, form);
            return apprentice;
        } else {
            throw new Exception("This user is not an apprentice");
        }
    }
    
    private void updateApprenticeInformations(Apprentice apprentice, FormApprenticeDTO form) throws Exception {
        Tutor tutor = tutorRepository.findOne(form.getTutorId());
        CompanySite companySite = companySiteRepository.findOne(form.getCompanyId());
	
        apprentice.setContractType(form.getContractType());
        apprentice.setPromotion(form.getPromotion());
        apprentice.setTutor(tutor);
        apprentice.setCompanySite(companySite);
        apprenticeRepository.save(apprentice);
    }
    
    public Tutor getTutor(User user) {
        return tutorRepository.findByUser(user);
    }

	public Tutor getTutor(Long userId) {
		return tutorRepository.findOne(userId);
	}
    
    public Tutor createTutor(FormTutorDTO form) throws Exception {
        Tutor tutor = new Tutor();
        User user = new User();
        return updateTutorInformations(tutor, user, form);
    }
    
    public void deleteTutor(Long id) throws Exception {
        Tutor tutor = tutorRepository.findOne(id);
        User user = tutor.getUser();
    	tutorRepository.delete(id);
    	userRepository.delete(user);
    }

    public void assignApprenticeToTutor(Long tutorId, Long apprenticeId) {
        Apprentice apprentice = apprenticeRepository.findOne(apprenticeId);
        Tutor tutor = tutorRepository.findOne(tutorId);
        apprentice.setTutor(tutor);
        apprenticeRepository.save(apprentice);
    }
    
    public Tutor updateTutor(Long userId, FormTutorDTO form) throws Exception {
    	User user = userRepository.findOne(userId);
    	if (user.getRole().getName().equals(RolesNames.TUTOR)) {
    		Tutor tutor = getTutor(user);
    		return updateTutorInformations(tutor, user, form);
    	} else {
            throw new Exception("This user is not a Tutor");
        }
    }
    
    private Tutor updateTutorInformations(Tutor tutor, User user, FormTutorDTO form) throws Exception {

        user.setFirstName(form.getFirstName());
        user.setLastName(form.getLastName());
        user.setEmail(form.getEmail());
        user.setActive(false);
        user.setSexe(form.getSexe());

        Role role = roleRepository.findByName(RolesNames.TUTOR);
        user.setRole(role);
        userRepository.save(user);

        tutor.setJob(form.getJob());
		tutor.setUser(user);
		return tutorRepository.save(tutor);
    }

	public List<Apprentice> getApprentices() {
    	return apprenticeRepository.findAll();
	}

    public List<Tutor> getTutors() {
        return tutorRepository.findAll();
    }

    public List<User> getConsultants() {
        return userRepository.findConsultants();
    }

    public User getUserById(Long userId) {
        return userRepository.findOne(userId);
    }

    public User updateConsultant(Long id, FormConsultantDTO form) {
        User user = userRepository.findOne(id);
        user.setFirstName(form.getFirstName());
        user.setLastName(form.getLastName());
        user.setEmail(form.getEmail());
        user.setSexe(form.getSexe());
        return userRepository.save(user);
    }

    public void deleteConsultant(Long id) {
        userRepository.delete(id);
    }
}
