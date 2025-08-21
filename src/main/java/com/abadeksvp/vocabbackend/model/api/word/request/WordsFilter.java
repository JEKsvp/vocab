package com.abadeksvp.vocabbackend.model.api.word.request;

import com.abadeksvp.vocabbackend.model.WordStatus;
import com.abadeksvp.vocabbackend.model.api.PageableFilter;
import com.abadeksvp.vocabbackend.model.db.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class WordsFilter extends PageableFilter {
    @Nullable
    private String q;

    @Nullable
    private WordStatus status;

    @Nullable
    private Language language = Language.ENGLISH;
}
