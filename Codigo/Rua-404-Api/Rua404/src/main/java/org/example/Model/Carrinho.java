package org.example.Model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "carrinho_final_model")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private BigDecimal valorTotal;

    @OneToMany(mappedBy = "carrinho", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShoppingCart> shoppingCart;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "customer_id")
    private Customer user;

}
