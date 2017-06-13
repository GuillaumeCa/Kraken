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

	@PostMapping("/{name}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Company createCompany(@PathVariable String name) throws Exception {
		return companyService.createCompany(name);
	}

	@PutMapping("/{id}/{name}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Company updateCompany(@PathVariable Long id, @PathVariable String name) throws Exception {
		return companyService.updateCompany(id, name);
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

	@DeleteMapping("/site/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteCompanySite(@PathVariable Long id) throws Exception {
		companyService.deleteCompanySite(id);
	}

	@DeleteMapping("/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public void deleteCompany(@PathVariable Long id) throws Exception {
		companyService.deleteCompany(id);
	}

	@PostMapping("/{id}/site")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public CompanySite createCompanySite(@PathVariable Long id, @RequestBody FormCompanySiteDTO form) throws Exception {
		return companyService.createCompanySite(id, form);
	}
	
	@GetMapping("/{id}/sites")
	@RolesAllowed({RolesNames.SUPER_ADMIN,RolesNames.CONSULTANT,RolesNames.TUTOR})
	public List<CompanySite> getCompanySites(@PathVariable Long id) throws Exception {
		return companyService.getCompanySites(id);
	}

	@PutMapping("/site/{id}")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public CompanySite updateCompanySite(@PathVariable Long id, @RequestBody FormCompanySiteDTO form) throws Exception {
		return companyService.updateCompanySite(id, form);
	}
}
