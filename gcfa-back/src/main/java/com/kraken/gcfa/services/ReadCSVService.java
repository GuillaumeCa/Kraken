package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.entity.*;
import com.kraken.gcfa.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReadCSVService {

	private static final String DELIMITER = ";";

	@Autowired
	private ApprenticeRepository apprenticeRepository;

	@Autowired
	private CompanyRepository companyRepository;
	
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
			Tutor tutor;
			Company company;
			CompanySite companySite;
			String[] param = line.split(DELIMITER);
			if(param.length >= 0) {
				user.setActive(true);
				user.setFirstName(param[0]);
				user.setLastName(param[1]);
				user.setRole(role);

				user.setEmail(param[2]);
				user.setLdapId(param[3]);
				user.setSexe(param[4]);
				apprentice.setUser(user);
				users.add(user);
				
				company = companyRepository.findByName(param[5]);
				if(company == null) {
					Company companyToCreate = new Company();
					companyToCreate.setName(param[5]);
					companyRepository.save(companyToCreate);
					company = companyToCreate;
				}
				
				companySite = companySiteRepository.findByName(param[6]);
				if(companySite == null) {
					CompanySite companySiteToCreate = creationOfNewCompanySite(param,company);
					apprentice.setCompanySite(companySiteToCreate);
				} else {
					apprentice.setCompanySite(companySite);
				}
				
				
				
				apprentice.setPromotion(Integer.parseInt((param[10])));
				if(param[11].equals("3 ans")) {
					apprentice.setContractType(ContractType.THREE_YEARS);
				} else if(param[11].equals("2 ans")) {
					apprentice.setContractType(ContractType.TWO_YEARS);
				}
				tutor = tutorRepository.findTutorByEmail(param[12]);
				if(tutor == null) {
					throw new Exception(String.format("The Tutor with email %s doesn't exist", param[12]));
				} 
				apprentice.setTutor(tutor);
					
			}
			else {
				throw new Exception(String.format("The CSV doesn't have apprentice"));
			}
			apprentices.add(apprentice);
		}
		userRepository.save(users);
		apprenticeRepository.save(apprentices);
		return apprentices;
	}
	
	public CompanySite creationOfNewCompanySite(String[] param, Company company) {
		CompanySite companySiteTocreate = new CompanySite();
		companySiteTocreate.setCompany(company);
		companySiteTocreate.setName(param[6]);
		companySiteTocreate.setAddress(param[7]);
		companySiteTocreate.setCodePostal(Integer.parseInt(param[8]));
		companySiteTocreate.setCity(param[9]);
		companySiteRepository.save(companySiteTocreate);
		return companySiteTocreate;
	}
}
