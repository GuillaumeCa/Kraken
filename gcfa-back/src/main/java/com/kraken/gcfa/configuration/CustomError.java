package com.kraken.gcfa.configuration;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
public class CustomError {
    private Integer code;
    private String message;

    public CustomError(HttpServletResponse res, Exception e) {
        this.code = res.getStatus();
        this.message = e.getMessage();
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
