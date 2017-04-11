package com.kraken.gcfa.entity;

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

    @OneToMany(mappedBy = "apprentice")
    private List<Document> documents;
    
    private String durationContract;

    private Date endContract;

    @Enumerated(EnumType.STRING)
    private ContractType contractType;

    @ManyToOne
    private CompanySite company;

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

    public String getDurationContract() {
        return durationContract;
    }

    public void setDurationContract(String durationContract) {
        this.durationContract = durationContract;
    }

    public Date getEndContract() {
        return endContract;
    }

    public void setEndContract(Date endContract) {
        this.endContract = endContract;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

}
