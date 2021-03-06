package com.kraken.gcfa.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
@ControllerAdvice
public class GlobalExceptionConfiguration {

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(UsernameNotFoundException.class)
    public CustomError handleConflict(HttpServletResponse res, UsernameNotFoundException e) {
        return new CustomError(res, e);
    }

}
