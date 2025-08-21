package com.abadeksvp.vocabbackend.service;

import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;
import com.abadeksvp.vocabbackend.model.db.Language;

import java.util.List;

public interface WordsBatchService {

    void generate(int size, Language language);
    List<WordResponse> getBatch(Language language);
}
