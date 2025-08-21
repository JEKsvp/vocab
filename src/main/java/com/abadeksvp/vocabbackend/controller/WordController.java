package com.abadeksvp.vocabbackend.controller;

import com.abadeksvp.vocabbackend.model.api.PageableFilter;
import com.abadeksvp.vocabbackend.model.api.paging.PageableDto;
import com.abadeksvp.vocabbackend.model.api.word.request.ChangeWordStatusRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.CreateWordRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.UpdateWordRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.WordsFilter;
import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;
import com.abadeksvp.vocabbackend.service.WordService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/words")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public PageableDto<WordResponse> getWordsToLearn(@Valid WordsFilter filter) {
        return wordService.getWords(filter);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public WordResponse createWord(@RequestBody @Valid CreateWordRequest request) {
        return wordService.createWord(request);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public WordResponse updateWord(@RequestBody @Valid UpdateWordRequest request) {
        return wordService.updateWord(request);
    }

    @DeleteMapping("/{wordId}")
    public void deleteWord(@PathVariable String wordId){
        wordService.deleteWord(wordId);
    }

    @GetMapping("/{wordId}")
    public WordResponse getWord(@PathVariable String wordId){
        return wordService.getWordById(wordId);
    }

    @PatchMapping(value = "/status", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public WordResponse changeStatus(@RequestBody @Valid ChangeWordStatusRequest request) {
        return wordService.changeWordStatus(request);
    }
}
