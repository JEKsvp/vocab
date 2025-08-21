package com.abadeksvp.vocabbackend.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // Serve the built React app at /home
    @GetMapping("/home")
    public String home() {
        // forward to the static index.html that is packaged into the jar
        return "forward:/index.html";
    }
}
