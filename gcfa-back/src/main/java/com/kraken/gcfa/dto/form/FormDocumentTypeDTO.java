package com.kraken.gcfa.dto.form;

import com.kraken.gcfa.entity.ContractType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * Created by Guillaume on 06/05/2017.
 * gcfa-back
 */
public class FormDocumentTypeDTO {
    private String name;

    @Enumerated(EnumType.STRING)
    private ContractType contract;

    private Integer day;
    
    private Integer month;
    
    private Integer year;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ContractType getContract() {
        return contract;
    }

    public void setContract(ContractType contract) {
        this.contract = contract;
    }

	public Integer getDay() {
		return day;
	}

	public void setDay(Integer day) {
		this.day = day;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}
}
