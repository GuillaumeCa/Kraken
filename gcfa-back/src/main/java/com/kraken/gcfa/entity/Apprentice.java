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
    private User tutor;

    @OneToMany(mappedBy = "apprentice")
    private List<Document> documents;

    private Date endContract;

    @OneToOne
    private Company company;

}
