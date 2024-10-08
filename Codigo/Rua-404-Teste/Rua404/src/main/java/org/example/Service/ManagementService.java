package org.example.Service;

import org.example.Model.Customer;
import org.example.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.Random;

@Service
public class ManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

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

            if (diferent.getTime() / 1000 < 900) {
                userBd.setPassword(user.getPassword());
                userBd.setCode(null);
                userBd.setSendCode(null);
                userBd.setCodeExpiration(null);
                userRepository.saveAndFlush(userBd);
                return "Senha alterada com sucesso!";
            } else {
                return "Código expirado! Solicite um novo código!";
            }
        } else {
            return "Email ou código não encontrado!";
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
                return "Código expirado! Solicite um novo código!";
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Código inválido");
        }
    }

    public String updatePassword(Customer user) {
        Customer userBd = userRepository.findByEmailAsync(user.getEmail());
        if (userBd != null) {
            userBd.setPassword(user.getPassword()); // Encoder de senha:
            // passwordEncoder.encode().
            userRepository.saveAndFlush(userBd);
            return "Senha alterada com sucesso!";
        } else {
            return "Erro ao alterar senha!";
        }
    }

    private String getCode(Long id) {
        Random random = new Random();
        int code = 1000 + random.nextInt(9000);
        return String.valueOf(code);
    }
}
