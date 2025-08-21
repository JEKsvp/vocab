package com.abadeksvp.vocabbackend.model.api.word.request;

import com.abadeksvp.vocabbackend.model.WordStatus;
import com.abadeksvp.vocabbackend.model.db.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateWordRequest {
    @NotNull
    private UUID id;
    @NotEmpty
    private String title;
    private String transcription;
    private String part;
    @NotNull
    private WordStatus status;
    @NotEmpty
    private List<UpsertDefinitionRequest> definitions = new ArrayList<>();

    private Language language = Language.ENGLISH;
}
