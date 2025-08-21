package com.abadeksvp.vocabbackend.controller;

import com.abadeksvp.vocabbackend.exceptions.ApiException;
import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;
import com.abadeksvp.vocabbackend.model.db.Language;
import com.abadeksvp.vocabbackend.service.WordsBatchService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/words-batch")
public class WordsBatchController {

    private final WordsBatchService wordsBatchService;

    public WordsBatchController(WordsBatchService wordsBatchService) {
        this.wordsBatchService = wordsBatchService;
    }

    @PostMapping("/generate")
    public void generate(@RequestParam(defaultValue = "50") int size,
                         @RequestParam(defaultValue = "ENGLISH") Language language) {
        if (size <= 0 || size > 200) {
            throw new ApiException("Size must be between 0 and 200", HttpStatus.CONFLICT);
        }
        wordsBatchService.generate(size, language);
    }

    @GetMapping
    public List<WordResponse> getWordsBatch(@RequestParam(defaultValue = "ENGLISH") Language language) {
        return wordsBatchService.getBatch(language);
    }
}
