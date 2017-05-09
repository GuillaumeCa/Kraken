package com.kraken.gcfa.configuration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Guillaume on 08/05/2017.
 * gcfa-back
 */
public class ErrorMessage {

    private String error;

    public ErrorMessage() {

    }

    public ErrorMessage(String message) {
        this.error = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
