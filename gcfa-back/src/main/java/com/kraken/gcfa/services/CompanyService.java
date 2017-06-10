package com.kraken.gcfa.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kraken.gcfa.dto.form.FormCompanySiteDTO;
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
	
	public Company getCompany(String name) throws Exception {
		return companyRepository.findByName(name);
	}
	
	public void deleteCompany(String name) throws Exception {
		companyRepository.deleteByName(name);
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
	
	public CompanySite getCompanySite(String name) throws Exception {
		return companySiteRepository.findByName(name);
	}
	
	public void deleteCompanySite(String name) throws Exception {
		companySiteRepository.deleteByName(name);
    }
	

}
