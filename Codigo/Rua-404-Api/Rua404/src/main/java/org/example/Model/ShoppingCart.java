package org.example.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "carrinho")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nome_produto;
    @Column
    private Date data_pedido;
    @Column
    private Integer quantidade;
    @Column
    private Double valor_total;
    @Column
    private Double valor_por_produto;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Customer user;

    @ManyToOne
    @JoinColumn(name = "user_endereco_id", referencedColumnName = "id")
    private Endereco userEndereco;

    @ManyToOne
    @JoinColumn(name = "produto_id", referencedColumnName = "id")
    private Product produto;
}
