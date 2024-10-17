package org.example.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.Model.Order;
import org.example.Repositories.OrderRepository;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public Order update(Long id, Order order) {
        Optional<Order> existingOrder = orderRepository.findById(id);
        if (existingOrder.isPresent()) {
            Order updatedOrder = existingOrder.get();
            updatedOrder.setDate(order.getDate());
            updatedOrder.setStaffId(order.getStaffId());
            updatedOrder.setCustomerId(order.getCustomerId());
            updatedOrder.setInventoryId(order.getInventoryId());
            return orderRepository.save(updatedOrder);
        } else {
            throw new RuntimeException("Pedido não encontrado");
        }
    }

    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }
}

