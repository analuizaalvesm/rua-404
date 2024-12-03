package org.example.Controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import org.example.DTOS.ResponseDTO;
import org.example.DTOS.loginDTO;
import org.example.DTOS.registerDTO;
import org.example.Enum.UserRole;
import org.example.Model.Customer;
import org.example.Repositories.CustomerRepository;
import org.example.Security.JwtUtil;
import org.example.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/{email}")
    public ResponseEntity<Customer> getUserByemail(@PathVariable String email){
        Customer user=authService.getByEmail(email);
        if(user!=null){
            return ResponseEntity.ok().body(user);
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }
@PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid loginDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        Customer a=this.customerRepository.findByEmail(data.email());
        if(a.getRole()==(UserRole.USER)){
        String token = JwtUtil.generateAdmToken(this.customerRepository.findByEmailAsync(data.email()).getEmail());

        ResponseDTO response=new ResponseDTO(token, a.getRole());
         return ResponseEntity.ok(response);
        }

        String token = JwtUtil.generateToken(this.customerRepository.findByEmailAsync(data.email()).getEmail());

        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid registerDTO data){
        if(this.customerRepository.findByEmail(data.email())!=null){
            return ResponseEntity.badRequest().build();
        }
        String encryptPassword=new BCryptPasswordEncoder().encode(data.password());
        Customer newUser= new Customer(data.first_name(),data.last_name(),data.email(),encryptPassword);
        newUser.setRole(UserRole.ADMIN);
        
        LocalDate hoje = LocalDate.now();
        Date date=Date.from(hoje.atStartOfDay(ZoneId.systemDefault()).toInstant());

        newUser.setCreate_data(date);

        customerRepository.save(newUser);
        return ResponseEntity.ok(newUser);
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
