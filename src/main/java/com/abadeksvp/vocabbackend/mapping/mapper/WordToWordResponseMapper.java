package com.abadeksvp.vocabbackend.mapping.mapper;

import com.abadeksvp.vocabbackend.model.api.word.response.WordResponse;
import com.abadeksvp.vocabbackend.model.db.Word;
import org.springframework.stereotype.Service;

@Service
public class WordToWordResponseMapper implements Mapper<Word, WordResponse> {

    private final DefinitionToDefinitionResponseMapper toDefinitionResponseMapper;

    public WordToWordResponseMapper(DefinitionToDefinitionResponseMapper toDefinitionResponseMapper) {
        this.toDefinitionResponseMapper = toDefinitionResponseMapper;
    }

    @Override
    public WordResponse map(Word word) {
        return WordResponse.builder()
                .id(word.getId())
                .title(word.getTitle())
                .transcription(word.getTranscription())
                .part(word.getPart())
                .status(word.getStatus())
                .definitions(toDefinitionResponseMapper.mapAll(word.getDefinitions()))
                .createDate(word.getCreateDate())
                .lastUpdateDate(word.getLastUpdateDate())
                .language(word.getLanguage())
                .build();
    }
}
