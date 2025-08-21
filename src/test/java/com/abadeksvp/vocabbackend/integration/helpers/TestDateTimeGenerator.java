package com.abadeksvp.vocabbackend.integration.helpers;

import com.abadeksvp.vocabbackend.service.DateTimeGenerator;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TestDateTimeGenerator implements DateTimeGenerator {
    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    public static final LocalDateTime TEST_DATE_TIME = LocalDateTime.parse("2022-09-25 22:30:40", FORMATTER);

    private LocalDateTime dateTime = TEST_DATE_TIME;

    @Override
    public LocalDateTime now() {
        LocalDateTime returnValue = dateTime;
        dateTime = TEST_DATE_TIME;
        return returnValue;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

}
