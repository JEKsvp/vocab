package com.abadeksvp.vocabbackend.mapping.creator;

import com.abadeksvp.vocabbackend.mapping.mapper.UpsertDefinitionRequestToDefinitionMapper;
import com.abadeksvp.vocabbackend.model.api.word.request.CreateWordRequest;
import com.abadeksvp.vocabbackend.model.db.Word;
import com.abadeksvp.vocabbackend.security.SecurityUtils;
import com.abadeksvp.vocabbackend.service.DateTimeGenerator;
import com.abadeksvp.vocabbackend.service.UuidGenerator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WordCreator implements Creator<CreateWordRequest, Word> {

    private final UuidGenerator uuidGenerator;
    private final UpsertDefinitionRequestToDefinitionMapper toDefinitionMapper;
    private final DateTimeGenerator dateTimeGenerator;

    public WordCreator(UuidGenerator uuidGenerator,
                       UpsertDefinitionRequestToDefinitionMapper toDefinitionMapper,
                       DateTimeGenerator dateTimeGenerator) {
        this.uuidGenerator = uuidGenerator;
        this.toDefinitionMapper = toDefinitionMapper;
        this.dateTimeGenerator = dateTimeGenerator;
    }

    @Override
    public Word create(CreateWordRequest request) {
        String username = SecurityUtils.getCurrentUsername();
        LocalDateTime now = dateTimeGenerator.now();
        return Word.builder()
                .id(uuidGenerator.generate())
                .username(username)
                .title(request.getTitle())
                .transcription(request.getTranscription())
                .part(request.getPart())
                .status(request.getStatus())
                .language(request.getLanguage())
                .definitions(toDefinitionMapper.mapAll(request.getDefinitions()))
                .createDate(now)
                .lastUpdateDate(now)
                .build();
    }
}
