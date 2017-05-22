package com.kraken.gcfa.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

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

public class ReadCSVService {
	
	private static final String COMMA_DELIMITER = ",";
	
	private ApprenticeRepository apprenticeRepository;
	private CompanySiteRepository companySiteRepository;
	private RoleRepository roleRepository;
	
	public void createApprenticeFromCSV(String urlFile) throws IOException {
		User user = new User();
		Apprentice apprentice = new Apprentice();
		Role role;
		CompanySite companySite;
		
		List<String> lines = Files.readAllLines(Paths.get(urlFile));
		for(String line : lines) {
			String[] param = line.split(COMMA_DELIMITER);
			if(param.length >= 0) {
				user.setFirstName(param[0]);
				user.setLastName(param[1]);
				role = roleRepository.findByName(RolesNames.APPRENTICE);
				user.setRole(role);
					
				user.setEmail(param[3]);
				user.setSexe(param[4]);
				apprentice.setUser(user);
				
				companySite = companySiteRepository.findByName(param[5]);
				if(companySite != null) {
					apprentice.setCompanySite(companySite);
				} else {
					throw new IOException(String.format("The CompanySite don't exist"));
				}
				apprentice.setPromotion(Integer.parseInt((param[6])));
				if(param[7] == " 3 ans") {
					apprentice.setContractType(ContractType.THREE_YEARS);
				} else if(param[7] == " 3 ans") {
					apprentice.setContractType(ContractType.TWO_YEARS);
				}
				apprenticeRepository.save(apprentice);
			}
		}
	}
}
