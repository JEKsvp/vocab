package com.abadeksvp.vocabbackend.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

public class SecurityUtils {

    public static String getCurrentUsername() {
        SecurityContext context = SecurityContextHolder.getContext();
        return context.getAuthentication().getName();
    }

    public static List<SimpleGrantedAuthority> getCurrentAuthority() {
        SecurityContext context = SecurityContextHolder.getContext();
        return (List<SimpleGrantedAuthority>) context.getAuthentication().getAuthorities();
    }

}
