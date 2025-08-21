package com.abadeksvp.vocabbackend.service.impl;

import com.abadeksvp.vocabbackend.exceptions.ApiException;
import com.abadeksvp.vocabbackend.mapping.creator.WordCreator;
import com.abadeksvp.vocabbackend.mapping.mapper.WordToWordResponseMapper;
import com.abadeksvp.vocabbackend.mapping.updater.WordUpdater;
import com.abadeksvp.vocabbackend.model.api.paging.PageableDto;
import com.abadeksvp.vocabbackend.model.api.word.request.ChangeWordStatusRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.CreateWordRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.UpdateWordRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.WordsFilter;
import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;
import com.abadeksvp.vocabbackend.model.db.Language;
import com.abadeksvp.vocabbackend.model.db.QWord;
import com.abadeksvp.vocabbackend.model.db.Word;
import com.abadeksvp.vocabbackend.repository.WordRepository;
import com.abadeksvp.vocabbackend.security.SecurityUtils;
import com.abadeksvp.vocabbackend.service.WordService;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;
    private final WordCreator wordCreator;
    private final WordUpdater wordUpdater;
    private final WordToWordResponseMapper toWordResponseMapper;

    public WordServiceImpl(WordRepository wordRepository,
                           WordCreator wordCreator,
                           WordUpdater wordUpdater,
                           WordToWordResponseMapper toWordResponseMapper) {
        this.wordRepository = wordRepository;
        this.wordCreator = wordCreator;
        this.wordUpdater = wordUpdater;
        this.toWordResponseMapper = toWordResponseMapper;
    }

    @Override
    public PageableDto<WordResponse> getWords(WordsFilter filter) {
        Predicate predicate = buildMongoPredicate(filter);
        PageRequest pageRequest = PageRequest.of(filter.getPage(), filter.getSize())
                .withSort(Sort.Direction.DESC, "lastUpdateDate");
        Page<Word> page = wordRepository.findAll(predicate, pageRequest);
        return new PageableDto<>(page, toWordResponseMapper::map);
    }

    @Override
    public void deleteWord(String wordId) {
        wordRepository.deleteById(UUID.fromString(wordId));
    }

    @Override
    public WordResponse getWordById(String wordId) {
        return wordRepository.findById(UUID.fromString(wordId))
                .map(toWordResponseMapper::map)
                .orElseThrow(() -> new ApiException("Word now found", HttpStatus.NOT_FOUND));
    }

    private Predicate buildMongoPredicate(WordsFilter filter) {
        String username = SecurityUtils.getCurrentUsername();
        BooleanExpression predicate = QWord.word.username.eq(username);
        if (filter.getStatus() != null) {
            predicate = predicate.and(QWord.word.status.eq(filter.getStatus()));
        }
        if (filter.getQ() != null) {
            predicate = predicate.and(QWord.word.title.containsIgnoreCase(filter.getQ()));
        }
        if(filter.getLanguage() != null){
            predicate = predicate.and(QWord.word.language.eq(filter.getLanguage()));
        }
        return predicate;
    }

    @Override
    public WordResponse createWord(CreateWordRequest request) {
        Word word = wordCreator.create(request);
        Word savedWord = wordRepository.save(word);
        return toWordResponseMapper.map(savedWord);
    }

    @Override
    public WordResponse updateWord(UpdateWordRequest request) {
        Word existingWord = wordRepository.findById(request.getId())
                .orElseThrow(() -> new ApiException("Word not found", HttpStatus.NOT_FOUND));
        Word word = wordUpdater.update(request, existingWord);
        Word savedWord = wordRepository.save(word);
        return toWordResponseMapper.map(savedWord);
    }

    @Override
    public WordResponse changeWordStatus(ChangeWordStatusRequest request) {
        Word word = wordRepository.findById(request.getId())
                .orElseThrow(() -> new ApiException("Word not found", HttpStatus.NOT_FOUND));
        word.setStatus(request.getStatus());
        Word savedWord = wordRepository.save(word);
        return toWordResponseMapper.map(savedWord);
    }
}
