package org.example.Model;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JsonIgnore
    private Customer user;

    @ManyToOne
    @JoinColumn(name = "carrinho_id", referencedColumnName = "id")
    @JsonIgnore
    private Carrinho carrinho;

}
