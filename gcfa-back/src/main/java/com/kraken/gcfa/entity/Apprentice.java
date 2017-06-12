package com.kraken.gcfa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 26/03/2017.
 * gcfa-back
 */
@Entity
public class Apprentice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private User user;

    @OneToOne
    private Tutor tutor;

    @JsonIgnore
    @OneToMany(mappedBy = "apprentice")
    private List<Document> documents;

    private Integer promotion;

    @Enumerated(EnumType.STRING)
    private ContractType contractType;

    @ManyToOne
    private CompanySite companySite;

    public String getFullName() {
        return this.user.getFirstName() + " " + this.user.getLastName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public CompanySite getCompanySite() {
        return companySite;
    }

    public void setCompanySite(CompanySite companySite) {
        this.companySite = companySite;
    }

    public Integer getPromotion() {
        return promotion;
    }

    public void setPromotion(Integer promotion) {
        this.promotion = promotion;
    }
}
