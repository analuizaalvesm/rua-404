package org.example.DTOS;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class OrderDTO {
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "UTC")
    private Date data;
    
    private BigDecimal valorTotal;
    private String status;
    private List<ProductDTO> produtos;

    // Construtor
    public OrderDTO(Long id, Date data, BigDecimal valorTotal, String status, List<ProductDTO> produtos) {
        this.id = id;
        this.data = data;
        this.valorTotal = valorTotal;
        this.status = status;
        this.produtos = produtos;
    }

    // Getters e Setters
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

    public List<ProductDTO> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ProductDTO> produtos) {
        this.produtos = produtos;
    }
}
