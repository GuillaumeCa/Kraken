package com.kraken.gcfa.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by Guillaume on 23/03/2017.
 * gcfa-back
 */
@Entity
public class DocumentType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    /**
     * Utilisé pour calculer la date de rendu du document
     */
    @Enumerated(EnumType.STRING)
    private ContractType contract;

    /**
     * Delta entre la date de début du contrat et la date de rendu du document
     */
    private Long deltaDeadline;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getDeltaDeadline() {
        return deltaDeadline;
    }

    public void setDeltaDeadline(Long deltaDeadline) {
        this.deltaDeadline = deltaDeadline;
    }
}
