package org.example.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "customer_id")
    private Customer user;

    public Customer getUser() {
        return user;
    }

    public void setUser(Customer user) {
        this.user = user;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ShoppingCart(Long id, String nomeProduto, Date dataPedido, Integer quantidade, BigDecimal valorTotal, BigDecimal valorPorProduto) {
        this.id = id;
        this.nomeProduto = nomeProduto;
        this.dataPedido = dataPedido;
        this.quantidade = quantidade;
        this.valorTotal = valorTotal;
        this.valorPorProduto = valorPorProduto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public Date getDataPedido() {
        return dataPedido;
    }

    public void setDataPedido(Date dataPedido) {
        this.dataPedido = dataPedido;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public BigDecimal getValorPorProduto() {
        return valorPorProduto;
    }

    public void setValorPorProduto(BigDecimal valorPorProduto) {
        this.valorPorProduto = valorPorProduto;
    }


//    @ManyToOne
//    @JoinColumn(name = "user_endereco_id", referencedColumnName = "id")
//    private Endereco userEndereco;
//
//    @ManyToOne
//    @JoinColumn(name = "produto_id", referencedColumnName = "id")
//    private Product produto;
}
