package com.kraken.gcfa.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.form.FormCompanySiteDTO;
import com.kraken.gcfa.entity.Company;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.services.CompanyService;

import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping("/creation")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Company createCompany(@RequestBody String name) throws Exception {
		return companyService.createCompany(name);
	}
	
	@GetMapping("/{id}")
	public Company geCompany(@PathVariable Long id) throws Exception {
		return companyService.getCompany(id);
	}

	@GetMapping
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public List<Company> geCompanies() throws Exception {
		return companyService.getCompanies();
	}
	
	@DeleteMapping("/delete")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteCompany(String name) throws Exception {
		companyService.deleteCompany(name);			
	}

	@PostMapping("/site")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public CompanySite createCompanySite(FormCompanySiteDTO form) throws Exception {
		return companyService.createCompanySite(form);
	}
	
	@GetMapping("/{id}/sites")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public List<CompanySite> geCompanySites(@PathVariable Long id) throws Exception {
		return companyService.getCompanySites(id);
	}
	
	@DeleteMapping("/delete/site")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteCompanySite(String name) throws Exception {
		companyService.deleteCompanySite(name);			
	}
}
