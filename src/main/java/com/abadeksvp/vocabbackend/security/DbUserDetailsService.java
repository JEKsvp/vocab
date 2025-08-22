package com.abadeksvp.vocabbackend.security;

import com.abadeksvp.vocabbackend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DbUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public DbUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Loading user details for username: {}", username);
        com.abadeksvp.vocabbackend.model.db.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.debug("User not found with username: {}", username);
                    return new UsernameNotFoundException("User not found");
                });
        log.debug("User found and details loaded successfully for username: {}", username);
        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .roles("USER")
                .authorities("USER")
                .build();
    }
}
