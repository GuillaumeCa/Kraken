package com.kraken.gcfa.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
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

@Service
public class ReadCSVService {

	private static final String COMMA_DELIMITER = ",";

	@Autowired
	private ApprenticeRepository apprenticeRepository;

	@Autowired
	private CompanySiteRepository companySiteRepository;

	@Autowired
	private TutorRepository tutorRepository;

	@Autowired
	private RoleRepository roleRepository;

	public Apprentice createApprenticeFromCSV(MultipartFile file) throws Exception {
		User user = new User();
		Apprentice apprentice = new Apprentice();
		Role role = roleRepository.findByName(RolesNames.APPRENTICE); 
		CompanySite companySite;
		Tutor tutor;

		List<String> lines =  new BufferedReader(new InputStreamReader(file.getInputStream(),StandardCharsets.UTF_8))
		.lines().collect(Collectors.toList());
		lines.remove(0);
		for(String line : lines) {
			String[] param = line.split(COMMA_DELIMITER);
			if(param.length >= 0) {
				user.setFirstName(param[0]);
				user.setLastName(param[1]);
				user.setRole(role);

				user.setEmail(param[3]);
				user.setSexe(param[4]);
				apprentice.setUser(user);

				companySite = companySiteRepository.findByName(param[5]);
				if(companySite != null) {
					apprentice.setCompanySite(companySite);
				} else {
					throw new NotFoundException(String.format("The CompanySite %s don't exist", param[5]));
				}
				apprentice.setPromotion(Integer.parseInt((param[6])));
				if(param[7] == "3 ans") {
					apprentice.setContractType(ContractType.THREE_YEARS);
				} else if(param[7] == "2 ans") {
					apprentice.setContractType(ContractType.TWO_YEARS);
				}
				tutor = tutorRepository.findTutorByEmail(param[8]);
				if(tutor != null) {
					apprentice.setTutor(tutor);
				} else {
					throw new NotFoundException(String.format("The Tutor with email /s don't exist", param[8]));
				}
				apprenticeRepository.save(apprentice);
			}
			else {
				throw new NotFoundException(String.format("The CSV doesn't have apprentice"));
			}
		}
		return apprentice;
	}
}
