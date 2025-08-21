package com.abadeksvp.vocabbackend.service.impl;

import com.abadeksvp.vocabbackend.service.UuidGenerator;

import java.util.UUID;

public class DefaultUuidGenerator implements UuidGenerator {

    @Override
    public UUID generate() {
        return UUID.randomUUID();
    }
}
