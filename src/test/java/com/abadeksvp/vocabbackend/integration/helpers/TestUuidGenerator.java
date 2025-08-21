package com.abadeksvp.vocabbackend.integration.helpers;

import com.abadeksvp.vocabbackend.service.UuidGenerator;

import java.util.UUID;

public class TestUuidGenerator implements UuidGenerator {

    public static final String TEST_UUID = "79ca8d24-f686-472a-b6f8-e40b5aacfc7e";

    private UUID uuid = UUID.fromString(TEST_UUID);

    @Override
    public UUID generate() {
        UUID returnUuid = this.uuid;
        this.uuid = UUID.fromString(TEST_UUID);
        return returnUuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }
}
