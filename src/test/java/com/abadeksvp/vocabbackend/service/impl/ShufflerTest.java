package com.abadeksvp.vocabbackend.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ShufflerTest {

    private Shuffler shuffler;

    @BeforeEach
    public void init() {
        shuffler = new Shuffler();
    }

    @Test
    public void sameItemsMustBeInDifferentOrder() {
        List<Integer> input = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
        List<Integer> shuffled1 = shuffler.shuffle(input, 20);
        List<Integer> shuffled2 = shuffler.shuffle(input, 20);
        assertNotEquals(shuffled1, shuffled2);
    }

}