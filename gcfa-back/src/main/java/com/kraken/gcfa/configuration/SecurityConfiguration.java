package com.kraken.gcfa.configuration;

import com.kraken.gcfa.configuration.security.TokenAuthenticationProvider;
import com.kraken.gcfa.configuration.security.CustomUserDetailService;
import com.kraken.gcfa.configuration.security.TokenAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

/**
 * Created by Guillaume on 22/03/2017.
 * gcfa-back
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private TokenAuthenticationProvider tokenAuthenticationProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(tokenAuthenticationProvider);
    }

    @Bean
    public TokenAuthenticationFilter authenticationTokenFilter() throws Exception {
        return new TokenAuthenticationFilter();
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(authenticationTokenFilter(), BasicAuthenticationFilter.class)

                // Autorisation de se connecter
                .authorizeRequests()
                .antMatchers("/login/**").permitAll()


                // Toutes les autres requetes necessitent une authentification
                .anyRequest().authenticated();
    }

}
