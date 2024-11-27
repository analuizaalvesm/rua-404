package org.example.Controller;

import java.util.List;
import org.example.DTOS.updateDTO;
import org.example.Model.Customer;
import org.example.Service.CustomerService;
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
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAll(){
       return this.customerService.getAllCustomers();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
    Customer Customer= this.customerService.getCustomerById(id);
    if(Customer!=null){
        return ResponseEntity.ok(Customer);
    }else{
        return ResponseEntity.notFound().build();
    }
}

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer newCustomer){
       try {
        Customer CustomerNew=this.customerService.createCustomer(newCustomer);
        return ResponseEntity.ok().body(CustomerNew);
       } catch (Exception e) {
        return ResponseEntity.badRequest().build();
       }
    }   
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@RequestBody updateDTO user,@PathVariable long id){
        try {
            Customer customer= this.customerService.updateCustomer(user,id);
            return ResponseEntity.ok(customer);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    } 
    @DeleteMapping("/{id}")
        public ResponseEntity<Void> removeCustomer(@PathVariable Long id){
            this.customerService.deleteCustomer(id);
            return ResponseEntity.ok().build();
    }

    
}
