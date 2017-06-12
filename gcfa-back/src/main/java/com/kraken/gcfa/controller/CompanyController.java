package com.kraken.gcfa.controller;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.form.FormCompanySiteDTO;
import com.kraken.gcfa.entity.Company;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Company createCompany(@RequestBody String name) throws Exception {
		return companyService.createCompany(name);
	}
	
	@GetMapping("/{id}")
	@RolesAllowed({RolesNames.SUPER_ADMIN,RolesNames.CONSULTANT,RolesNames.TUTOR})
	public Company getCompany(@PathVariable Long id) throws Exception {
		return companyService.getCompany(id);
	}

	@GetMapping
	@RolesAllowed({RolesNames.SUPER_ADMIN,RolesNames.CONSULTANT,RolesNames.TUTOR})
	public List<Company> getCompanies() throws Exception {
		return companyService.getCompanies();
	}
	
	@DeleteMapping("/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteCompany(@PathVariable Long id) throws Exception {
		companyService.deleteCompany(id);
	}

	@PostMapping("/site")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public CompanySite createCompanySite(FormCompanySiteDTO form) throws Exception {
		return companyService.createCompanySite(form);
	}
	
	@GetMapping("/{id}/sites")
	@RolesAllowed({RolesNames.SUPER_ADMIN,RolesNames.CONSULTANT,RolesNames.TUTOR})
	public List<CompanySite> getCompanySites(@PathVariable Long id) throws Exception {
		return companyService.getCompanySites(id);
	}
	
	@DeleteMapping("/{id}/site")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteCompanySite(@PathVariable Long id) throws Exception {
		companyService.deleteCompanySite(id);
	}
}
