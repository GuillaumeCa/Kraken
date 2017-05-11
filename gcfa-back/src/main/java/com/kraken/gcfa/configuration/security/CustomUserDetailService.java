package com.kraken.gcfa.configuration.security;

import com.kraken.gcfa.entity.Role;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.repository.UserRepository;
import com.kraken.gcfa.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
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

    @Override
    public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException {
        return userRepository.findByToken(token);
    }
}
