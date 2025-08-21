package com.abadeksvp.vocabbackend.service.impl;

import com.abadeksvp.vocabbackend.service.DateTimeGenerator;

import java.time.LocalDateTime;

public class DefaultDateTimeGenerator implements DateTimeGenerator {

    @Override
    public LocalDateTime now() {
        return LocalDateTime.now();
    }
}
