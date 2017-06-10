package com.kraken.gcfa.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.services.ReadCSVService;

@RestController
@RequestMapping("/importcsv")
public class CSVController {
	
	@Autowired
	private ReadCSVService readCSVService;
	
	@PostMapping("/createApprentice")
	@RolesAllowed(RolesNames.SUPER_ADMIN)
	public List<Apprentice> createApprenticeFromCSV(@RequestParam("file") MultipartFile file) throws Exception {
		try{
			return readCSVService.createApprenticeFromCSV(file);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
