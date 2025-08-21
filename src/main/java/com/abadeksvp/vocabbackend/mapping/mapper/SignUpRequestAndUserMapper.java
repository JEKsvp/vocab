package com.abadeksvp.vocabbackend.mapping.mapper;

import com.abadeksvp.vocabbackend.mapping.mapper.Mapper;
import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.db.User;
import com.abadeksvp.vocabbackend.service.DateTimeGenerator;
import com.abadeksvp.vocabbackend.service.UuidGenerator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class SignUpRequestAndUserMapper implements Mapper<SignUpRequest, User> {

    private final DateTimeGenerator dateTimeGenerator;
    private final UuidGenerator uuidGenerator;
    private final PasswordEncoder passwordEncoder;

    public SignUpRequestAndUserMapper(DateTimeGenerator dateTimeGenerator, UuidGenerator uuidGenerator) {
        this.dateTimeGenerator = dateTimeGenerator;
        this.uuidGenerator = uuidGenerator;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public User map(SignUpRequest signUpRequest) {
        LocalDateTime now = dateTimeGenerator.now();
        UUID id = uuidGenerator.generate();
        String encodedPassword = passwordEncoder.encode(signUpRequest.getPassword());
        return User.builder()
                .id(id)
                .username(signUpRequest.getUsername())
                .password(encodedPassword)
                .createDate(now)
                .lastUpdateDate(now)
                .build();
    }
}
