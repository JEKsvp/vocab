package com.abadeksvp.vocabbackend.mapping.mapper;

import com.abadeksvp.vocabbackend.mapping.mapper.Mapper;
import com.abadeksvp.vocabbackend.model.api.word.response.DefinitionResponse;
import com.abadeksvp.vocabbackend.model.db.Definition;
import org.springframework.stereotype.Service;

@Service
public class DefinitionToDefinitionResponseMapper implements Mapper<Definition, DefinitionResponse> {

    @Override
    public DefinitionResponse map(Definition definition) {
        return DefinitionResponse.builder()
                .definition(definition.getDefinition())
                .examples(definition.getExamples())
                .build();
    }
}
