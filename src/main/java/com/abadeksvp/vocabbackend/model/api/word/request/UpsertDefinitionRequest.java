package com.abadeksvp.vocabbackend.model.api.word.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpsertDefinitionRequest {
    @NotEmpty
    private String definition;

    @NotEmpty
    private List<String> examples = new ArrayList<>();
}
