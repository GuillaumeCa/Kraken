package com.kraken.gcfa.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.FormApprenticeDTO;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.services.ReadCSVService;

@RestController
@RequestMapping("/importcsv")
public class CSVController {
	
	@Autowired
	private ReadCSVService readCSVService;
	
	@PostMapping("/createApprentice")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public Apprentice createApprenticeFromCSV(@RequestParam("file") MultipartFile file) throws Exception {
		return readCSVService.createApprenticeFromCSV(file);
	}
}
