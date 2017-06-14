package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.form.FormApprenticeDTO;
import com.kraken.gcfa.dto.form.FormConsultantDTO;
import com.kraken.gcfa.dto.form.FormTutorDTO;
import com.kraken.gcfa.entity.*;
import com.kraken.gcfa.repository.*;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public Apprentice getApprentice(Long id) {
        return apprenticeRepository.findOne(id);
    }
    
    public List<Apprentice> getApprenticesFromTutor(Tutor tutor) {
        return apprenticeRepository.findAllByTutor(tutor);
    }
    
    public List<User> searchUser(Long roleId, String search) {
    	String[] strings;
    	List<User> users = new ArrayList<>();
    	if (search.contains(" ")) {
    		strings = search.split(" ");
    		if (strings.length>=2) {
        		users = userRepository.searchUserByNames(roleId, strings[0], strings[1]);
    		}
    	}
    	else {
    		users = userRepository.searchUser(roleId, search);
    	}
    	return users;
    }
    
    public List<Apprentice> getApprenticesFromUsers(List<User> users) {
    	
    	return apprenticeRepository.findByUserIn(users);
    }
    
    public List<Tutor> getTutorsFromUsers(List<User> users) {
    	return tutorRepository.findByUserIn(users);
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
        user.setPassword("$2a$10$4M6IdprJuyeRjfuDs10j5u4nlviDQv7EyoI.Ow/TxLqr0ws8W0I/G");
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
        dtoToConsultant(user, form);
        return userRepository.save(user);
    }

    public void dtoToConsultant(User user, FormConsultantDTO form) {
        user.setFirstName(form.getFirstName());
        user.setLastName(form.getLastName());
        user.setEmail(form.getEmail());
        user.setSexe(form.getSexe());
    }

    public void deleteConsultant(Long id) {
        userRepository.delete(id);
    }

    public User getConsultant(Long id) throws NotFoundException {
        User user = userRepository.findOne(id);
        if (user.getRole().getName().equals(RolesNames.CONSULTANT)) {
            return user;
        } else {
          throw new NotFoundException("This user is not a consultant");
        }
    }

    public User createConsultant(FormConsultantDTO form) {
        User user = new User();
        dtoToConsultant(user, form);
        Role role = roleRepository.findByName(RolesNames.CONSULTANT);
        user.setRole(role);
        user.setActive(false);
        return userRepository.save(user);
    }

    public void modifPassword(String password, User auth) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashed = passwordEncoder.encode(password);
        auth.setPassword(hashed);
        userRepository.save(auth);
    }
}
