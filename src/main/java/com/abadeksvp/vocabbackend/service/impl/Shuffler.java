package com.abadeksvp.vocabbackend.service.impl;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class Shuffler {

    public <T> List<T> shuffle(Collection<T> input, int limit) {
        return input.stream()
                .map(Container::new)
                .collect(Collectors.toSet())
                .stream().limit(limit)
                .map(Container::getObj)
                .collect(Collectors.toList());
    }

    @Getter
    @EqualsAndHashCode(exclude = "obj")
    private static class Container<T> {
        private final UUID id;
        private final T obj;

        private Container(T obj) {
            this.id = UUID.randomUUID();
            this.obj = obj;
        }
    }
}
