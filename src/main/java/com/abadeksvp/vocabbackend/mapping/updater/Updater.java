package com.abadeksvp.vocabbackend.mapping.updater;

public interface Updater<Source, Target> {
    Target update(Source source, Target target);
}
