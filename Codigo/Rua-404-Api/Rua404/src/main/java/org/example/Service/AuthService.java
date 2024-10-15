package org.example.Service;

import org.example.Model.Customer;
import org.example.Repositories.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

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

    public String login(String email, String password) {   
        // implementar lógica de login
        return "Usuário logado!";
    }
}
