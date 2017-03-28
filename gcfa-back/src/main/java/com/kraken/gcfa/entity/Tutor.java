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

}
