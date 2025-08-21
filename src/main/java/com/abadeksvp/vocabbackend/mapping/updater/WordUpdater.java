package com.abadeksvp.vocabbackend.mapping.updater;

import com.abadeksvp.vocabbackend.mapping.mapper.UpsertDefinitionRequestToDefinitionMapper;
import com.abadeksvp.vocabbackend.model.api.word.request.CreateWordRequest;
import com.abadeksvp.vocabbackend.model.api.word.request.UpdateWordRequest;
import com.abadeksvp.vocabbackend.model.db.Word;
import com.abadeksvp.vocabbackend.service.DateTimeGenerator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WordUpdater implements Updater<UpdateWordRequest, Word>{

    private final UpsertDefinitionRequestToDefinitionMapper toDefinitionMapper;
    private final DateTimeGenerator dateTimeGenerator;

    public WordUpdater(UpsertDefinitionRequestToDefinitionMapper toDefinitionMapper, DateTimeGenerator dateTimeGenerator) {
        this.toDefinitionMapper = toDefinitionMapper;
        this.dateTimeGenerator = dateTimeGenerator;
    }

    @Override
    public Word update(UpdateWordRequest request, Word existing) {
        LocalDateTime now = dateTimeGenerator.now();
        return Word.builder()
                .id(existing.getId())
                .username(existing.getUsername())
                .title(request.getTitle())
                .transcription(request.getTranscription())
                .part(request.getPart())
                .status(request.getStatus())
                .language(request.getLanguage())
                .definitions(toDefinitionMapper.mapAll(request.getDefinitions()))
                .createDate(existing.getCreateDate())
                .lastUpdateDate(now)
                .build();
    }
}
