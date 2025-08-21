package com.abadeksvp.vocabbackend.model.api.word.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DefinitionResponse {
    private String definition;
    private List<String> examples;
}
