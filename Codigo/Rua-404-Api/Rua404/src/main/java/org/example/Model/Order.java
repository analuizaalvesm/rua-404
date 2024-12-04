package org.example.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.Setter;
import org.example.Enum.OrderStatus;

@Entity
@Table(name = "Pedidos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date data;

    @ManyToMany
    @JoinTable(
            name = "pedido_produto",
            joinColumns = @JoinColumn(name = "pedido_id"),
            inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<Product> produtos = new ArrayList<>();

    private BigDecimal valorTotal;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;


    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = true)
    private Customer usuario;

    public Order(Carrinho carrinho, List<Product> produtos) {
        this.valorTotal = carrinho.getValorTotal();
        this.status = OrderStatus.PENDENTE;
        this.usuario = carrinho.getUser();
        this.produtos = produtos;
        this.data = new Date();
    }

}

