package com.kraken.gcfa.dto;

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

    private Long deltaDueDate;

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

    public Long getDeltaDueDate() {
        return deltaDueDate;
    }

    public void setDeltaDueDate(Long deltaDueDate) {
        this.deltaDueDate = deltaDueDate;
    }
}
