package com.kraken.gcfa.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.kraken.gcfa.dto.FormCompanySiteDTO;
import com.kraken.gcfa.entity.Company;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.repository.CompanyRepository;
import com.kraken.gcfa.repository.CompanySiteRepository;


@Service
public class CompanyService {
	
	@Autowired
	private CompanySiteRepository companySiteRepository;
	
	@Autowired
	private CompanyRepository companyRepository;

	public Company createCompany(String name) throws Exception {
		Company company = new Company();
		company.setName(name);
		companyRepository.save(company);
		return company;
	}
	
	public CompanySite createCompanySite(FormCompanySiteDTO formCompanySiteDTO) throws Exception {
		CompanySite companySite = new CompanySite();
		companySite.setId(formCompanySiteDTO.getIdCompany());
		companySite.setAddress(formCompanySiteDTO.getAddress());
		companySite.setCity(formCompanySiteDTO.getCity());
		companySite.setCodePostal(formCompanySiteDTO.getCodePostal());
		companySite.setName(formCompanySiteDTO.getName());
		companySiteRepository.save(companySite);
		return companySite;
	}
	

}
