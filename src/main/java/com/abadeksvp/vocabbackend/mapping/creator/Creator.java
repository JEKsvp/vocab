package com.abadeksvp.vocabbackend.mapping.creator;

public interface Creator<Source, Target> {
    Target create(Source source);
}
