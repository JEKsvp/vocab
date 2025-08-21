package com.abadeksvp.vocabbackend.mapping.mapper;

import com.abadeksvp.vocabbackend.mapping.mapper.Mapper;
import com.abadeksvp.vocabbackend.model.api.word.request.UpsertDefinitionRequest;
import com.abadeksvp.vocabbackend.model.db.Definition;
import org.springframework.stereotype.Service;

@Service
public class UpsertDefinitionRequestToDefinitionMapper implements Mapper<UpsertDefinitionRequest, Definition> {

    @Override
    public Definition map(UpsertDefinitionRequest upsertDefinitionRequest) {
        return Definition.builder()
                .definition(upsertDefinitionRequest.getDefinition())
                .examples(upsertDefinitionRequest.getExamples())
                .build();
    }
}
