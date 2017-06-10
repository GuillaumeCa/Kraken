package com.kraken.gcfa.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.entity.ContractType;
import com.kraken.gcfa.entity.Role;
import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.repository.ApprenticeRepository;
import com.kraken.gcfa.repository.CompanySiteRepository;
import com.kraken.gcfa.repository.RoleRepository;
import com.kraken.gcfa.repository.TutorRepository;
import com.kraken.gcfa.repository.UserRepository;

@Service
public class ReadCSVService {

	private static final String DELIMITER = ";";

	@Autowired
	private ApprenticeRepository apprenticeRepository;

	@Autowired
	private CompanySiteRepository companySiteRepository;

	@Autowired
	private TutorRepository tutorRepository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;

	public List<Apprentice> createApprenticeFromCSV(MultipartFile file) throws Exception {
		
		List<Apprentice> apprentices = new ArrayList<Apprentice>();
		List<User> users = new ArrayList<User>();
		Role role = roleRepository.findByName(RolesNames.APPRENTICE); 
		List<String> lines =  new BufferedReader(new InputStreamReader(file.getInputStream(),StandardCharsets.UTF_8))
			.lines().collect(Collectors.toList());
		lines.remove(0);
		for(String line : lines) {
			Apprentice apprentice = new Apprentice();
			User user = new User();
			CompanySite companySite;
			Tutor tutor;
			String[] param = line.split(DELIMITER);
			if(param.length >= 0) {
				user.setFirstName(param[0]);
				user.setLastName(param[1]);
				user.setRole(role);

				user.setEmail(param[2]);
				user.setSexe(param[3]);
				apprentice.setUser(user);
				users.add(user);

				companySite = companySiteRepository.findByName(param[4]);
				if(companySite == null) {
					throw new NotFoundException(String.format("The CompanySite %s don't exist", param[4]));
				}
				apprentice.setCompanySite(companySite);
				apprentice.setPromotion(Integer.parseInt((param[5])));
				if(param[6].equals("3 ans")) {
					apprentice.setContractType(ContractType.THREE_YEARS);
				} else if(param[6].equals("2 ans")) {
					apprentice.setContractType(ContractType.TWO_YEARS);
				}
				tutor = tutorRepository.findTutorByEmail(param[7]);
				if(tutor == null) {
					throw new NotFoundException(String.format("The Tutor with email %s doesn't exist", param[7]));
				} 
				apprentice.setTutor(tutor);
					
			}
			else {
				throw new NotFoundException(String.format("The CSV doesn't have apprentice"));
			}
			apprentices.add(apprentice);
		}
		userRepository.save(users);
		apprenticeRepository.save(apprentices);
		return apprentices;
	}
}
