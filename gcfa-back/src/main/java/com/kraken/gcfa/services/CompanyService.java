package com.kraken.gcfa.services;

import com.kraken.gcfa.entity.DocumentType;
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
	
	public void deleteCompany(Long id) throws Exception {
		companyRepository.delete(id);
    }
		
	public CompanySite createCompanySite(Long id, FormCompanySiteDTO formCompanySiteDTO) throws Exception {
		CompanySite companySite = new CompanySite();
		Company company = companyRepository.findOne(id);
		companySite.setCompany(company);
		buildCompanySite(companySite, formCompanySiteDTO);
		return companySiteRepository.save(companySite);
	}

	private void buildCompanySite(CompanySite companySite, FormCompanySiteDTO form) {
		companySite.setAddress(form.getAddress());
		companySite.setCity(form.getCity());
		companySite.setCodePostal(form.getCodePostal());
		companySite.setName(form.getName());
	}

	public CompanySite updateCompanySite(Long id, FormCompanySiteDTO form) {
		CompanySite companySite = companySiteRepository.findOne(id);
		buildCompanySite(companySite, form);
		return companySiteRepository.save(companySite);
	}

	public void deleteCompanySite(Long id) throws Exception {
		companySiteRepository.delete(id);
    }


    public List<CompanySite> getCompanySites(Long id) {
		Company company = companyRepository.findOne(id);
        return companySiteRepository.findCompanySitesByCompany(company);
	}

	public List<Company> getCompanies() {
		return companyRepository.findAll();
	}

	public Company updateCompany(Long id, String name) {
		Company company = companyRepository.findOne(id);
		company.setName(name);
		return companyRepository.save(company);
	}
}
