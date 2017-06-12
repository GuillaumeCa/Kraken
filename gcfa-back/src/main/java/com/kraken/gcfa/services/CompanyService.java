package com.kraken.gcfa.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kraken.gcfa.dto.form.FormCompanySiteDTO;
import com.kraken.gcfa.entity.Company;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.repository.CompanyRepository;
import com.kraken.gcfa.repository.CompanySiteRepository;

import java.util.List;


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
	
	public Company getCompany(Long id) throws Exception {
		return companyRepository.findOne(id);
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

	public void deleteCompanySite(String name) throws Exception {
		companySiteRepository.deleteByName(name);
    }


    public List<CompanySite> getCompanySites(Long id) {
		Company company = companyRepository.findOne(id);
        return companySiteRepository.findCompanySitesByCompany(company);
	}

	public List<Company> getCompanies() {
		return companyRepository.findAll();
	}
}
