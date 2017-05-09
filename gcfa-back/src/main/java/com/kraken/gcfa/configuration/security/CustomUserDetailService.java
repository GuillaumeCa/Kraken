package com.kraken.gcfa.configuration.security;

import com.kraken.gcfa.entity.Role;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.repository.UserRepository;
import com.kraken.gcfa.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Override
    public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException {
        User user = userRepository.findByToken(token);
        if (authService.isTokenExpired(user)) {
            throw new UsernameNotFoundException("The token has expired");
        }
        if (user != null) {
            user = authService.updateTokenExpiration(user);
        }
        return user;
    }
}
