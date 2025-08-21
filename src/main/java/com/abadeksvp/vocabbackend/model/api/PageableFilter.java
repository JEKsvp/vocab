package com.abadeksvp.vocabbackend.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageableFilter {
    private int page = 0;
    private int size = 20;
}
