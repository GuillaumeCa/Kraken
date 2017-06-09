package com.kraken.gcfa.repository;

import org.springframework.data.repository.CrudRepository;

import com.kraken.gcfa.entity.Company;
import com.kraken.gcfa.entity.User;

public interface CompanyRepository extends CrudRepository<Company, Long> {
	Company findByName(String name);
	void deleteByName(String name);
}
