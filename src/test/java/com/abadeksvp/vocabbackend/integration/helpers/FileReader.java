package com.abadeksvp.vocabbackend.integration.helpers;

import java.nio.charset.StandardCharsets;
import lombok.SneakyThrows;
import org.apache.commons.io.IOUtils;

public class FileReader {

    @SneakyThrows
    public String read(String path){
        return IOUtils.toString(getClass().getResource(path), StandardCharsets.UTF_8);
    }
}
