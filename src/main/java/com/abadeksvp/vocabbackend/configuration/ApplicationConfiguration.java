package com.abadeksvp.vocabbackend.configuration;

import com.abadeksvp.vocabbackend.service.DateTimeGenerator;
import com.abadeksvp.vocabbackend.service.UuidGenerator;
import com.abadeksvp.vocabbackend.service.impl.DefaultDateTimeGenerator;
import com.abadeksvp.vocabbackend.service.impl.DefaultUuidGenerator;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("!test")
public class ApplicationConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public DateTimeGenerator dateTimeGenerator() {
        return new DefaultDateTimeGenerator();
    }

    @Bean
    @ConditionalOnMissingBean
    public UuidGenerator uuidGenerator() {
        return new DefaultUuidGenerator();
    }
}
