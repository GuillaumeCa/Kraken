package com.kraken.gcfa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Guillaume on 26/03/2017.
 * gcfa-back
 */
@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "company")
    private List<CompanySite> sites;

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

    public int getNumSites() {
        return this.sites.size();
    }

    @JsonIgnore
    public List<CompanySite> getSites() {
        return sites;
    }

    public void setSites(List<CompanySite> sites) {
        this.sites = sites;
    }
}
