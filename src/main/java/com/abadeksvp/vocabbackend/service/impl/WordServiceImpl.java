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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
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
        log.debug("Getting words with filter - page: {}, size: {}, status: {}, language: {}, query: {}", 
                filter.getPage(), filter.getSize(), filter.getStatus(), filter.getLanguage(), filter.getQ());
        Predicate predicate = buildMongoPredicate(filter);
        PageRequest pageRequest = PageRequest.of(filter.getPage(), filter.getSize())
                .withSort(Sort.Direction.DESC, "lastUpdateDate");
        Page<Word> page = wordRepository.findAll(predicate, pageRequest);
        log.debug("Found {} words out of {} total for current filter", page.getNumberOfElements(), page.getTotalElements());
        return new PageableDto<>(page, toWordResponseMapper::map);
    }

    @Override
    public void deleteWord(String wordId) {
        log.debug("Deleting word with ID: {}", wordId);
        wordRepository.deleteById(UUID.fromString(wordId));
        log.debug("Word deleted successfully with ID: {}", wordId);
    }

    @Override
    public WordResponse getWordById(String wordId) {
        log.debug("Getting word by ID: {}", wordId);
        WordResponse result = wordRepository.findById(UUID.fromString(wordId))
                .map(toWordResponseMapper::map)
                .orElseThrow(() -> {
                    log.debug("Word not found with ID: {}", wordId);
                    return new ApiException("Word now found", HttpStatus.NOT_FOUND);
                });
        log.debug("Found word with ID: {} and title: {}", wordId, result.getTitle());
        return result;
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
        log.debug("Creating new word with title: {} and language: {}", request.getTitle(), request.getLanguage());
        Word word = wordCreator.create(request);
        Word savedWord = wordRepository.save(word);
        log.debug("Word created successfully with ID: {} and title: {}", savedWord.getId(), savedWord.getTitle());
        return toWordResponseMapper.map(savedWord);
    }

    @Override
    public WordResponse updateWord(UpdateWordRequest request) {
        log.debug("Updating word with ID: {}", request.getId());
        Word existingWord = wordRepository.findById(request.getId())
                .orElseThrow(() -> {
                    log.debug("Word not found for update with ID: {}", request.getId());
                    return new ApiException("Word not found", HttpStatus.NOT_FOUND);
                });
        log.debug("Found existing word: {} for update", existingWord.getTitle());
        Word word = wordUpdater.update(request, existingWord);
        Word savedWord = wordRepository.save(word);
        log.debug("Word updated successfully with ID: {} and title: {}", savedWord.getId(), savedWord.getTitle());
        return toWordResponseMapper.map(savedWord);
    }

    @Override
    public WordResponse changeWordStatus(ChangeWordStatusRequest request) {
        log.debug("Changing word status to {} for word ID: {}", request.getStatus(), request.getId());
        Word word = wordRepository.findById(request.getId())
                .orElseThrow(() -> {
                    log.debug("Word not found for status change with ID: {}", request.getId());
                    return new ApiException("Word not found", HttpStatus.NOT_FOUND);
                });
        log.debug("Current status of word {}: {}, changing to: {}", word.getTitle(), word.getStatus(), request.getStatus());
        word.setStatus(request.getStatus());
        Word savedWord = wordRepository.save(word);
        log.debug("Word status changed successfully for ID: {}", savedWord.getId());
        return toWordResponseMapper.map(savedWord);
    }
}
