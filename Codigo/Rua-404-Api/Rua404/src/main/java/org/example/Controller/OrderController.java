package org.example.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.Model.Order;
import org.example.Model.Pedido;
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

    @PostMapping("/{usuarioId}")
    public Order createPedido(@PathVariable Long usuarioId, @RequestBody Order pedido) {
        return orderService.savePedido(pedido, usuarioId);
    }

}

