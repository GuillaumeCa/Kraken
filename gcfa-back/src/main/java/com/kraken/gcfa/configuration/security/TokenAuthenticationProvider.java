package com.kraken.gcfa.configuration.security;

import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.services.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

/**
 * Created by Guillaume on 10/05/2017.
 * gcfa-back
 */
@Component
public class TokenAuthenticationProvider implements AuthenticationProvider {

    private final Logger LOG = LoggerFactory.getLogger(TokenAuthenticationProvider.class);

    @Autowired
    AuthService authService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        TokenBasedAuthentication auth = (TokenBasedAuthentication) authentication;
        User user = (User) auth.getPrincipal();
        if (authService.isTokenExpired(user)) {
            throw new BadCredentialsException("The token has expired");
        }
        authService.updateTokenExpiration(user);
        return auth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
