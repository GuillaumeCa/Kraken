package com.kraken.gcfa.entity;

import javax.persistence.*;

/**
 * Created by Guillaume on 21/03/2017.
 * gcfa-back
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean enabled;
    private boolean tokenExpired;

    @OneToOne
    private Role role;
}
