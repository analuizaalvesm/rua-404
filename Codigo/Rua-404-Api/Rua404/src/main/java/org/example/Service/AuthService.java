package org.example.Service;

import org.example.Model.Customer;
import org.example.Repositories.AuthRepository;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.UserRepository;
import org.example.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AuthRepository authRepository;

    @Autowired

    private UserRepository userRepository;

    public Customer getByEmail(String email){
       try {
        return userRepository.findByEmailAsync(email);
       } catch (Exception e) {
        throw new RuntimeException("Usuario não encontrado.");
       }
    }
    
    public String registerUser(Customer newCustomer){
        if (emailExists(newCustomer.getEmail())) {
            throw new RuntimeException("Email já está em uso.");
        }
    try {
        this.customerRepository.save(newCustomer);
        return "Usuario cadastrado";
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuario nao pode ser cadastrado");
    }

    }
    public boolean emailExists(String email) {
        Customer customer = userRepository.findByEmailAsync(email);
        return customer != null;
    }    

    public String deleteByEmail(String email) {
        try {
            authRepository.deleteByEmail(email);
            return "Usuário deletado!";

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Código inválido");
        }

    }

    public String updateUser(Customer customer, String email) {
        Customer customerDb = authRepository.findByEmailAsync(email);
        try {
            if(customerDb != null){
                if(customer.getFirst_name() != null) {
                    customerDb.setFirst_name(customer.getFirst_name());
                }
                if(customer.getLast_name() != null) {
                    customerDb.setLast_name(customer.getLast_name());
                }
                if(customer.getAddress() != null) {
                    customerDb.setAddress(customer.getAddress());
                }
                if(customer.getEmail() != null) {
                    customerDb.setEmail(customer.getEmail());
                }
        authRepository.save(customerDb);
            }
            return "Usuário atualizado!";
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Código inválido");
        }
    }

    public String login(Customer customer) {
        Customer newOne = userRepository.findByEmailAsync(customer.getEmail());
        if (customer != null) {
            if (newOne.getPassword().equals(customer.getPassword())) {
                String token = JwtUtil.generateToken(newOne.getEmail());
                return token;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Código inválido");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.customerRepository.findByEmail(username);
    }
}
