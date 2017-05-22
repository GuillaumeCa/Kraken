package com.kraken.gcfa.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.FormCompanySiteDTO;
import com.kraken.gcfa.entity.Company;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.services.CompanyService;

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

	@PostMapping("/site")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public CompanySite createCompanySite(FormCompanySiteDTO form) throws Exception {
		return companyService.createCompanySite(form);
	}
}
