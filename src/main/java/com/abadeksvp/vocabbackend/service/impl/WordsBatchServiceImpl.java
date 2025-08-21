package com.abadeksvp.vocabbackend.service.impl;

import com.abadeksvp.vocabbackend.exceptions.ApiException;
import com.abadeksvp.vocabbackend.mapping.mapper.WordToWordResponseMapper;
import com.abadeksvp.vocabbackend.model.WordStatus;
import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;
import com.abadeksvp.vocabbackend.model.db.Language;
import com.abadeksvp.vocabbackend.model.db.Word;
import com.abadeksvp.vocabbackend.model.db.WordsBatch;
import com.abadeksvp.vocabbackend.repository.WordBatchRepository;
import com.abadeksvp.vocabbackend.repository.WordRepository;
import com.abadeksvp.vocabbackend.security.SecurityUtils;
import com.abadeksvp.vocabbackend.service.DateTimeGenerator;
import com.abadeksvp.vocabbackend.service.UuidGenerator;
import com.abadeksvp.vocabbackend.service.WordsBatchService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WordsBatchServiceImpl implements WordsBatchService {

    private static final double TO_LEARN_PERCENTAGE = 0.71;
    private static final double LEARNED_PERCENTAGE = 1 - TO_LEARN_PERCENTAGE;

    private final WordRepository wordRepository;
    private final WordBatchRepository batchRepository;
    private final WordToWordResponseMapper toWordResponseMapper;
    private final Shuffler shuffler;
    private final DateTimeGenerator dateTimeGenerator;
    private final UuidGenerator uuidGenerator;

    public WordsBatchServiceImpl(WordRepository wordRepository,
                                 WordBatchRepository batchRepository,
                                 WordToWordResponseMapper toWordResponseMapper,
                                 Shuffler shuffler,
                                 DateTimeGenerator dateTimeGenerator, UuidGenerator uuidGenerator) {
        this.wordRepository = wordRepository;
        this.batchRepository = batchRepository;
        this.toWordResponseMapper = toWordResponseMapper;
        this.shuffler = shuffler;
        this.dateTimeGenerator = dateTimeGenerator;
        this.uuidGenerator = uuidGenerator;
    }

    @Override
    public void generate(int size, Language language) {
        String username = SecurityUtils.getCurrentUsername();
        List<Word> words = wordRepository.findByUsernameAndLanguage(username, language);

        double toLearnSize = Math.floor(size * TO_LEARN_PERCENTAGE);
        List<UUID> shuffleToLearnIds = getShuffled(words, WordStatus.TO_LEARN, toLearnSize);

        double learnedSize = Math.ceil(size * LEARNED_PERCENTAGE);
        List<UUID> shuffleLearnedIds = getShuffled(words, WordStatus.LEARNED, learnedSize);

        List<UUID> resultIds = new ArrayList<>(shuffleToLearnIds);
        resultIds.addAll(shuffleLearnedIds);

        WordsBatch batch = batchRepository.findByUsernameAndLanguage(username, language)
                .orElse(createNewBatch(username, language));
        batch.setWords(resultIds);
        batch.setLastUpdateDate(dateTimeGenerator.now());
        batchRepository.save(batch);
    }

    private WordsBatch createNewBatch(String username, Language language) {
        return WordsBatch.builder()
                .id(uuidGenerator.generate())
                .username(username)
                .language(language)
                .build();
    }

    private List<UUID> getShuffled(List<Word> words, WordStatus status, double size) {
        int toLearnSize = (int) size;
        List<UUID> toLearnIds = words.stream()
                .filter(word -> status == word.getStatus())
                .map(Word::getId)
                .collect(Collectors.toList());
        return shuffler.shuffle(toLearnIds, toLearnSize);
    }

    @Override
    public List<WordResponse> getBatch(Language language) {
        String username = SecurityUtils.getCurrentUsername();
        WordsBatch batch = batchRepository.findByUsernameAndLanguage(username, language)
                .orElseThrow(() -> new ApiException("Batch not found", HttpStatus.NOT_FOUND));
        List<Word> words = wordRepository.findAllByIdIn(batch.getWords());
        return toWordResponseMapper.mapAll(words);
    }
}
