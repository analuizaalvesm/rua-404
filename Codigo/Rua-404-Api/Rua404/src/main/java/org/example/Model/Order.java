package org.example.Model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.example.Enum.OrderStatus;

@Entity
@Table(name = "Pedidos")
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
    @JoinColumn(name = "usuario_id", nullable = false) // Cria uma chave estrangeira para usuário
    private Customer usuario;

    //RELACIONAMENTO PARA PEDIDO-PAGAMENTO
    // @OneToOne
    // @JoinColumn(name = "pagamento_id")
    // private Pagamento pagamento;

    public Order(Long id, Date data, List<Product> produtos, BigDecimal valorTotal, Customer usuario, OrderStatus status) {
        this.id = id;
        this.data = data;
        this.produtos = produtos;
        this.valorTotal = valorTotal;
        this.usuario = usuario;
        this.status = status;
    }

    public  Order(ShoppingCart carrinho, OrderStatus Status, Product produto) {
        this.data = new Date();
        this.produtos.add(produto);
        this.valorTotal = carrinho.getValorTotal();
        this.usuario = carrinho.getUser();
        this.status = Status;
    }
public Order(){

}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
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

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
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

