package org.example.Controller;

import org.example.DTOS.ChangePassowrdRequestDTO;
import org.example.Model.Customer;
import org.example.Service.ManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/management")
public class ManagementController {

    @Autowired
    private ManagementService managementService;

    @PostMapping("/get-code")
    public String getCode(@RequestBody Customer user) {
        return managementService.RequestPasswordCode(user.getEmail());
    }

    @PostMapping("/validate-code")
    public ResponseEntity<?> validateCode(@RequestBody Customer user) {
        if(managementService.validateCode(user).equals("Código expirado! Solicite um novo código!")){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/change-password")
    public String recoverPassword(@RequestBody Customer user) {
        return managementService.changePassword(user);
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePasswordChangePassowrd(@RequestBody ChangePassowrdRequestDTO user) {
         if(this.managementService.updatePassword(user.id(), user.senhaAtual(), user.novaSenha())==true){
            return ResponseEntity.ok().build();
         }return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}