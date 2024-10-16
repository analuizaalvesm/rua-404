package org.example.Controller;

import org.example.Model.Customer;
import org.example.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/{email}")
    public ResponseEntity<Customer> getUserByemail(@PathVariable String email){
        Customer user=authService.getByEmail(email);
        if(user!=null){
            return ResponseEntity.ok().body(user);
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }
    @PostMapping("/register")
    public String register(@RequestBody Customer customer) {
        return authService.registerUser(customer);
    }

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
