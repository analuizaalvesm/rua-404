package org.example.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.Model.Customer;
import org.example.Model.Order;
import org.example.Model.Pedido;
import org.example.Model.Product;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.ProductRepository;
import org.example.Repositories.OrderRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<Order> getAllPedidos() {
        return orderRepository.findAll();
    }

    public Optional<Order> getPedidoById(Long id) {
        return orderRepository.findById(id);
    }

    public Order savePedido(Order pedido, Long usuarioId) {
        // Busca o usuário pelo ID
        Customer usuario = customerRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + usuarioId));
        
        // Define o usuário no pedido
        pedido.setUsuario(usuario);
    
        // Busca os produtos existentes usando os IDs informados
        List<Product> produtosExistentes = pedido.getProdutos().stream()
                .map(produto -> productRepository.findById(produto.getId())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + produto.getId())))
                .collect(Collectors.toList());
    
        pedido.setProdutos(produtosExistentes);
    
        // Calcula o valor total do pedido
        BigDecimal total = produtosExistentes.stream()
                .map(Product::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        pedido.setValorTotal(total);
    
        return orderRepository.save(pedido);  
    }
    
}

