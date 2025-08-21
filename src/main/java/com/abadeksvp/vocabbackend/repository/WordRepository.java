package com.abadeksvp.vocabbackend.repository;

import com.abadeksvp.vocabbackend.model.db.Language;
import com.abadeksvp.vocabbackend.model.db.Word;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface WordRepository extends MongoRepository<Word, UUID>, QuerydslPredicateExecutor<Word> {

    List<Word> findByUsername(String username);

    List<Word> findByUsernameAndLanguage(String username, Language language);
    List<Word> findAllByIdIn(Collection<UUID> ids);
}
