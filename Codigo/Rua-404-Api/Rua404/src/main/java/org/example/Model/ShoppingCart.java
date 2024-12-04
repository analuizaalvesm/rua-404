package org.example.Model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "carrinho")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nomeProduto;
    @Column
    private Date dataPedido;
    @Column
    private Integer quantidade;
    @Column
    private BigDecimal valorTotal;
    @Column
    private BigDecimal valorPorProduto;
    @Column
    private String status;
    @Column
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "customer_id")
    private Customer user;

    @ManyToOne
    @JoinColumn(name = "carrinho_id", referencedColumnName = "id")
    private Carrinho carrinho;

}
