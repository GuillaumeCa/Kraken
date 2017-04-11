package com.kraken.gcfa.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Guillaume on 28/03/2017.
 * gcfa-back
 */
@Entity
public class Documentation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String path;
    private Date creation;

    @Enumerated(EnumType.STRING)
    private DocumentationType type;

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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public DocumentationType getType() {
        return type;
    }

    public void setType(DocumentationType type) {
        this.type = type;
    }
}
