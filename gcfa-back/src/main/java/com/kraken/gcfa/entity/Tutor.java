package com.kraken.gcfa.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Tutor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@OneToMany(mappedBy = "tutor")
    private List<Apprentice> apprentices;
	
	//TODO trigger en fonction de la liste des Apprenties
	private boolean isFreeTutor;

	private String job;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Apprentice> getApprentices() {
		return apprentices;
	}

	public void setApprentices(List<Apprentice> apprentices) {
		this.apprentices = apprentices;
	}

	public boolean isFreeTutor() {
		return isFreeTutor;
	}

	public void setFreeTutor(boolean freeTutor) {
		isFreeTutor = freeTutor;
	}

	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}
}
