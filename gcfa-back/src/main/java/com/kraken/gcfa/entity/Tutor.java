package com.kraken.gcfa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

import javax.persistence.*;

@Entity
public class Tutor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@OneToMany(mappedBy = "tutor")
    private List<Apprentice> apprentices;

	@OneToOne
	private User user;

	//TODO trigger en fonction de la liste des Apprenties
	private boolean isFreeTutor;

	private String job;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@JsonIgnore
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
