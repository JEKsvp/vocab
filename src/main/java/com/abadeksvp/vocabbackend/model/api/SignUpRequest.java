package com.abadeksvp.vocabbackend.model.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

    @Length(min = 6, max = 32)
    private String username;

    @Length(min = 6, max = 32)
    private String password;
}
