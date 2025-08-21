package com.abadeksvp.vocabbackend.service;

import com.abadeksvp.vocabbackend.model.db.Word;
import com.abadeksvp.vocabbackend.repository.WordRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Component
@Profile("backup")
public class BackupManager {

    private final WordRepository wordRepository;
    private final ObjectMapper objectMapper;

    public BackupManager(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.findAndRegisterModules();
    }

    @EventListener(ContextRefreshedEvent.class)
    @SneakyThrows
    public void init() {
        List<Word> words = wordRepository.findAll();
        objectMapper.writeValue(new File("backup.json"), words);
    }
}
