package org.example.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.Enum.OrderStatus;
import org.example.DTOS.OrderDTO;
import org.example.DTOS.ProductDTO;
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

    public List<OrderDTO> getOrdersByCustomerId(Long usuarioId) {
        List<Order> orders = orderRepository.findOrdersByCustomerId(usuarioId);
        return orders.stream()
                .map(order -> new OrderDTO(
                        order.getId(),
                        order.getData(),
                        order.getValorTotal(),
                        order.getStatus().name(),
                        order.getProdutos().stream()
                                .map(product -> new ProductDTO(product.getId(), product.getName(), product.getUrl()))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
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

    public void updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));

        if (order.getStatus() == OrderStatus.CANCELADO) {
            throw new IllegalArgumentException("Cannot update status of a canceled order");
        }

        order.setStatus(newStatus);
        orderRepository.save(order);
    }
}

