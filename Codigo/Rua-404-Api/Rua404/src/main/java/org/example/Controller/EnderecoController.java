package org.example.Controller;

import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.example.Model.Customer;
import org.example.Model.Endereco;
import org.example.Repositories.CustomerRepository;
import org.example.Service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    @Autowired
    private final EnderecoService enderecoService;
    @Autowired
    private CustomerRepository customerRepository;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @PostMapping
    public ResponseEntity<?> createEndereco(@RequestBody Endereco endereco,@RequestParam Long idCliente) {
        Customer obj=this.customerRepository.findById(idCliente).get();
        if(obj!=null){
            obj.setAddress(endereco);
        }else{
            return ResponseEntity.ok().body("Cliente não encontrado");
        }
        Endereco savedEndereco = enderecoService.saveEndereco(endereco);
        if (savedEndereco != null) {
            return new ResponseEntity<>(savedEndereco, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
public ResponseEntity<Endereco> getEnderecoById(@RequestParam Long idCliente) {
    Optional<Customer> clienteOpt = this.customerRepository.findById(idCliente);
    if (!clienteOpt.isPresent()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    Customer cliente = clienteOpt.get();
    Endereco address = cliente.getAddress();
    if (address == null) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    Long id = address.getIdEndereco();
    if (id == null) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    Optional<Endereco> endereco = enderecoService.getEnderecoById(id);
    return endereco.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
}


    @PutMapping
    public ResponseEntity<Endereco> updateEndereco(@RequestParam Long idCliente, @RequestBody Endereco enderecoDetails) {
        Long id=this.customerRepository.findById(idCliente).get().getAddress().getIdEndereco();
        Endereco updatedEndereco = enderecoService.updateEndereco(id, enderecoDetails);
        if (updatedEndereco != null) {
            return new ResponseEntity<>(updatedEndereco, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping
    public ResponseEntity<?> deleteEndereco(@RequestParam Long idCliente){
         this.enderecoService.deleteEndereco(idCliente);
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
