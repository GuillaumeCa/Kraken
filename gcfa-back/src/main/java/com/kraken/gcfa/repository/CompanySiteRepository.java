package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.Company;
import com.kraken.gcfa.entity.CompanySite;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Guillaume on 17/04/2017.
 * gcfa-back
 */
public interface CompanySiteRepository extends CrudRepository<CompanySite, Long> {
	List<CompanySite> findCompanySitesByCompany(Company company);
	CompanySite findByName(String s);
}
