package org.example.Model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Pedidos")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;

    @ManyToMany
    @JoinTable(
        name = "pedido_produto",
        joinColumns = @JoinColumn(name = "pedido_id"),
        inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<Product> produtos = new ArrayList<>();

    private BigDecimal valorTotal;

    private String status;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false) // Cria uma chave estrangeira para usuário
    private Customer usuario;

    //RELACIONAMENTO PARA PEDIDO-PAGAMENTO
    // @OneToOne
    // @JoinColumn(name = "pagamento_id")
    // private Pagamento pagamento;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public List<Product> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Product> produtos) {
        this.produtos = produtos;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Customer getUsuario() {
        return usuario;
    }

    public void setUsuario(Customer usuario) {
        this.usuario = usuario;
    }

    //GET E SET PARA PAGAMENTO
    // public Pagamento getPagamento() {
    //     return pagamento;
    // }

    // public void setPagamento(Pagamento pagamento) {
    //     this.pagamento = pagamento;
    // }
    
}

