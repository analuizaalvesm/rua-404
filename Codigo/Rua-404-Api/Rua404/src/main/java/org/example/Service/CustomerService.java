package org.example.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import org.example.DTOS.updateDTO;
import org.example.Model.Customer;
import org.example.Model.Endereco;
import org.example.Model.Order;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.EnderecoRepository;
import org.example.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired EnderecoRepository enderecoRepository;

    public List<Customer> getAllCustomers(){
        return this.customerRepository.findAll();
    }
    public Customer getCustomerById(long id){
        return this.customerRepository.getByID(id);
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
    public Customer updateCustomer(updateDTO updateUser,long id){
        LocalDate hoje = LocalDate.now();
        Date date=Date.from(hoje.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Customer obj= this.customerRepository.getByID(id);
        obj.setFirst_name(updateUser.first_name());
        obj.setLast_name(updateUser.last_name());
        obj.setEmail(updateUser.email());
        obj.setDataNascimento(updateUser.dataNascimento());
        obj.setCpf(updateUser.cpf());
        obj.setTelefone(updateUser.telefone());
        obj.setLast_update(date);
        return this.customerRepository.save(obj);
    }

    public void deleteCustomer(Long id){
            Customer obj=this.customerRepository.findById(id).get();
            if(obj!=null){
            List<Order> listaDePedidos=this.orderRepository.findOrdersByCustomerId(id);

            for (Order pedidos : listaDePedidos) {
                pedidos.setUsuario(null);
                this.orderRepository.save(pedidos);
            }
        
            obj.setAddress(null);
            customerRepository.save(obj);

            this.customerRepository.delete(obj);
        }
}
}
