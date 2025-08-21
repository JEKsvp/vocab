package com.abadeksvp.vocabbackend.repository;

import com.abadeksvp.vocabbackend.model.db.Language;
import com.abadeksvp.vocabbackend.model.db.WordsBatch;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;
import java.util.UUID;

public interface WordBatchRepository extends MongoRepository<WordsBatch, UUID>, QuerydslPredicateExecutor<WordsBatch> {
    Optional<WordsBatch> findByUsernameAndLanguage(String username, Language language);
}
