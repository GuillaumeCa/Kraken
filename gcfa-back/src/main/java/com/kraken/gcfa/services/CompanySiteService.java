package com.kraken.gcfa.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kraken.gcfa.dto.FormCompanySiteDTO;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.repository.CompanySiteRepository;


@Service
public class CompanySiteService {
	
	@Autowired
	private CompanySiteRepository companySiteRepository;

	
	public CompanySite createCompanySite(FormCompanySiteDTO formCompanySiteDTO) throws Exception {
		CompanySite companySite = new CompanySite();
		companySite.setAddress(formCompanySiteDTO.getAddress());
		companySite.setCity(formCompanySiteDTO.getCity());
		companySite.setCodePostal(formCompanySiteDTO.getCodePostal());
		companySite.setName(formCompanySiteDTO.getName());		
		companySiteRepository.save(companySite);
		return companySite;
	}
	

}
