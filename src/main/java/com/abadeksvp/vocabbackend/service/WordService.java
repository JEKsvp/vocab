package com.abadeksvp.vocabbackend.service;

import com.abadeksvp.vocabbackend.model.api.paging.PageableDto;
import com.abadeksvp.vocabbackend.model.api.word.request.ChangeWordStatusRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.CreateWordRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.UpdateWordRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.WordsFilter;
import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;

public interface WordService {

    WordResponse createWord(CreateWordRequest request);
    WordResponse updateWord(UpdateWordRequest request);
    WordResponse changeWordStatus(ChangeWordStatusRequest request);
    PageableDto<WordResponse> getWords(WordsFilter filter);
    void deleteWord(String wordId);

    WordResponse getWordById(String wordId);
}
