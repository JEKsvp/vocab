package com.abadeksvp.vocabbackend.integration.helpers;

import org.jetbrains.annotations.NotNull;
import org.skyscreamer.jsonassert.Customization;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.skyscreamer.jsonassert.comparator.CustomComparator;

import java.util.Arrays;

public class JsonComparators {

    public static CustomComparator excludeFields(String... fields) {
        Customization[] customizations = Arrays.stream(fields)
                .map(field -> new Customization(field, (o1, o2) -> true))
                .toArray(Customization[]::new);
        return new CustomComparator(JSONCompareMode.NON_EXTENSIBLE, customizations);
    }
}
