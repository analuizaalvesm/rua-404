package org.example.Service;

import java.util.List;
import java.util.Optional;

import org.example.Model.Customer;
import org.example.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers(){
        return this.customerRepository.findAll();
    }
    public Optional<Customer> getCustomerById(long id){
        return this.customerRepository.findById(id);
    }
    public Customer createCustomer(Customer newCustomer) {
        if (emailExists(newCustomer.getEmail())) {
            throw new RuntimeException("Email já está em uso.");
        }
        try {
            return this.customerRepository.save(newCustomer);
        } catch (RuntimeException e) {
            throw new RuntimeException("Não foi possível adicionar Cliente");
        }
    }
    
    public boolean emailExists(String email) {
        Customer customer = customerRepository.findByEmailAsync(email);
        return customer != null;
    }    
    public Customer updateCustomer(Customer CustomerObj){
        return customerRepository.findById(CustomerObj.getCustomer_id())
        .map(customer->{
            customer.setActive(CustomerObj.getActive());
            customer.setAddress(CustomerObj.getAddress());
            customer.setEmail(CustomerObj.getEmail());
            customer.setPassword(CustomerObj.getPassword());
            return customerRepository.save(customer);
        }).orElseThrow(()-> new RuntimeException("Cliente não encontrado"));
    }

    public void deleteCustomer(Long id){
        try {
            this.customerRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException("Não foi possivel delete Cliente");
        }
    }
}
