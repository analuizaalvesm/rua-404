package org.example.Controller;

import org.example.Model.Customer;
import org.example.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody Customer customer) {
        return authService.login(customer);
    }

    @PutMapping("/updateUserData/{email}")
    public String updateUserData(@RequestBody Customer customer, @PathVariable String email) {
        return authService.updateUser(customer, email);
    }


    @DeleteMapping("/deleteByEmail/{email}")
    public String deleteByEmail(@PathVariable String email) {
        return authService.deleteByEmail(email);
    }
}
