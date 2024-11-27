package org.example.Service;

import java.util.Optional;
import org.example.Model.Customer;
import org.example.Model.Endereco;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    public EnderecoService(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    public Endereco saveEndereco(Endereco endereco) {
        try {
            return enderecoRepository.save(endereco);
        } catch (Exception e) {
            System.err.println("Erro ao salvar endereço: " + e.getMessage());
            return null;
        }
    }

    public Optional<Endereco> getEnderecoById(Long id) {
        try {
            return enderecoRepository.findById(id);
        } catch (Exception e) {
            System.err.println("Erro ao buscar endereço por ID: " + e.getMessage());
            return Optional.empty();
        }
    }

    public Endereco updateEndereco(Long id, Endereco enderecoDetails) {
        try {
            Endereco endereco = enderecoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Endereço não encontrado com id: " + id));

            endereco.setRua(enderecoDetails.getRua());
            endereco.setNumero(enderecoDetails.getNumero());
            endereco.setComplemento(enderecoDetails.getComplemento());
            endereco.setBairro(enderecoDetails.getBairro());
            endereco.setCidade(enderecoDetails.getCidade());
            endereco.setEstado(enderecoDetails.getEstado());
            endereco.setPais(enderecoDetails.getPais());
            endereco.setCep(enderecoDetails.getCep());

            return enderecoRepository.save(endereco);
        } catch (Exception e) {
            System.err.println("Erro ao atualizar endereço: " + e.getMessage());
            return null;
        }
    }
    public boolean deleteEndereco(Long idCliente){
        Customer c =this.customerRepository.findById(idCliente).get();
            this.enderecoRepository.delete(c.getAddress());
            return true;
        
    }


}
