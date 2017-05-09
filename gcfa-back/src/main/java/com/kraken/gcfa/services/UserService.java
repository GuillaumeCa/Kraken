package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.FormApprenticeDTO;
import com.kraken.gcfa.dto.FormTutorDTO;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.repository.ApprenticeRepository;
import com.kraken.gcfa.repository.CompanySiteRepository;
import com.kraken.gcfa.repository.TutorRepository;
import com.kraken.gcfa.repository.UserRepository;

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

    public Apprentice getApprentice(User user) {
        return apprenticeRepository.findByUser(user);
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
    
    public Tutor createTutor(FormTutorDTO form) throws Exception {
    	User user = userRepository.findOne(form.getUserId());
    	if (user.getRole().getName().equals(RolesNames.TUTOR)) {
    		Tutor tutor = new Tutor();
    		updateTutorInformations(tutor, form);
    		return tutor;
    	} else {
            throw new Exception("This user is not a tutor");
        }
    }
    
    public Tutor updateTutor(FormTutorDTO form) throws Exception {
    	User user = userRepository.findOne(form.getUserId());
    	if (user.getRole().getName().equals(RolesNames.TUTOR)) {
    		Tutor tutor = getTutor(user);
    		updateTutorInformations(tutor, form);
    		return tutor;
    	} else {
            throw new Exception("This user is not a tutor");
        }
    }
    
    private void updateTutorInformations(Tutor tutor, FormTutorDTO form) throws Exception {
		tutor.setJob(form.getJob());
		tutorRepository.save(tutor);
    }

}
