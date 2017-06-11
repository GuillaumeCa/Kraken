package com.kraken.gcfa.dto.form;

/**
 * Created by Guillaume on 11/06/2017.
 * gcfa-back
 */
public class FormConsultantDTO {
    public String firstName;
    public String lastName;
    public String email;
    public String sexe;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }
}
