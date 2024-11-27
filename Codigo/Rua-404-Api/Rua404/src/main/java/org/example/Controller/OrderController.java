package org.example.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.Enum.OrderStatus;
import org.example.DTOS.OrderDTO;
import org.example.Model.Order;
import org.example.Service.OrderService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllPedidos() {
        return orderService.getAllPedidos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getPedidoById(@PathVariable Long id) {
        return orderService.getPedidoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{usuarioId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUsuarioId(@PathVariable Long usuarioId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerId(usuarioId); // Certifique-se de que este método retorna OrderDTO
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/{usuarioId}")
    public Order createPedido(@PathVariable Long usuarioId, @RequestBody Order pedido) {
        return orderService.savePedido(pedido, usuarioId);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        try {
            orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok("Order status updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred while updating order status");
        }
    }

}

