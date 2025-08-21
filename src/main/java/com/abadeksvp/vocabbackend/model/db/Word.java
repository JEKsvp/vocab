package com.abadeksvp.vocabbackend.model.db;

import com.abadeksvp.vocabbackend.model.WordStatus;
import com.querydsl.core.annotations.QueryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
@QueryEntity
public class Word {

    @Id
    private UUID id;
    private String username;
    private String title;
    private String transcription;
    private String part;
    private WordStatus status;
    private List<Definition> definitions;
    private LocalDateTime createDate;
    private LocalDateTime lastUpdateDate;
    private Language language;
}
