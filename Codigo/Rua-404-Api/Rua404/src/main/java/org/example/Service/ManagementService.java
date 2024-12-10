package org.example.Service;

import java.util.Date;
import java.util.Random;

import org.example.Model.Customer;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CustomerRepository customerRepository;

// comentando por motivos de testes
//    @Autowired
//    PasswordEncoder passwordEncoder;

    public String RequestPasswordCode(String email) {
        Customer user = userRepository.findByEmailAsync(email);
        if (user != null) {
            user.setCode(getCode(user.getCustomer_id()));
            user.setSendCode(new Date());
            userRepository.saveAndFlush(user);

            String codigoRecuperacao = user.getRecuperationCode(); // Ajuste aqui para obter o código correto

            emailService.sendEmail(user.getEmail(), "Código de recuperação de senha",
                    "Seu código de recuperação de senha é: " + codigoRecuperacao);

            return "Código enviado!";
        } else {
            // Lidar com o caso em que o usuário não foi encontrado
            return "Usuário não encontrado!";
        }
    }

    public String changePassword(Customer user) {
        Customer userBd = userRepository.findByEmailAndCode(user.getEmail(), user.getRecuperationCode());
        if (userBd != null) {
            Date diferent = new Date(new Date().getTime() - userBd.getDataSendCode().getTime());

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
            String passwordEncrypted=passwordEncoder.encode(userBd.getPassword());
            
            
            if (diferent.getTime() / 1000 < 900) {
                userBd.setPassword(passwordEncrypted);
                userBd.setCode(null);
                userBd.setSendCode(null);
                userBd.setCodeExpiration(null);
                userRepository.saveAndFlush(userBd);
                return HttpStatus.OK.toString();
            } else {
               return HttpStatus.UNAUTHORIZED.toString();
            }
        } else {
            return HttpStatus.BAD_REQUEST.toString();
        }
    }

    public String validateCode(Customer user) {
        Customer userBd = userRepository.findByEmailAndCode(user.getEmail(), user.getRecuperationCode());
        try {
            Date diferent = new Date(new Date().getTime() -
                    userBd.getDataSendCode().getTime());
            if (diferent.getTime() / 1000 < 900) { // 15 minutos
                return "Código válido!";
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT)+"Código expirado! Solicite um novo código!";
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Código inválido");
        }
    }

    public boolean updatePassword(Long id, String senhaAtual,String novaSenha) { 
        Customer user = this.customerRepository.findById(id).orElse(null);
        if (user == null) {
     return false; 
    } 
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
    if (passwordEncoder.matches(senhaAtual, user.getPassword())) {
         String novaSenhaEncrypted = passwordEncoder.encode(novaSenha);
          user.setPassword(novaSenhaEncrypted); this.customerRepository.save(user);
           return true; 
        }else 
           { 
            return false;
         }
    }

    private String getCode(Long id) {
        Random random = new Random();
        int code = 1000 + random.nextInt(9000);
        return String.valueOf(code);
    }
}
