package org.example.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "pedido")
@Builder
public class Pedido {
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
    @Null
    private String status;

    public Pedido(Long id, String nomeProduto, Date dataPedido, Integer quantidade, BigDecimal valorTotal, BigDecimal valorPorProduto, String status) {
        this.id = id;
        this.nomeProduto = nomeProduto;
        this.dataPedido = new Date();
        this.quantidade = quantidade;
        this.valorTotal = valorTotal;
        this.valorPorProduto = valorPorProduto;
        this.status = status;
    }

    public Pedido() {
    }

    public Pedido(ShoppingCart carrinho, String status) {
        this.nomeProduto = carrinho.getNomeProduto();
        this.dataPedido = new Date();
        this.quantidade = carrinho.getQuantidade();
        this.valorPorProduto = carrinho.getValorPorProduto();
        this.status = status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
