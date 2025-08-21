package com.abadeksvp.vocabbackend.model.db;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document
public class User {

    @Id
    private UUID id;

    private String username;

    private String password;

    private LocalDateTime createDate;

    private LocalDateTime lastUpdateDate;
}
