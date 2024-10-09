package org.example.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("hc")
public class HealthCheckController {

    @GetMapping
    public String login() {
        return "It's working!";
    }
}
