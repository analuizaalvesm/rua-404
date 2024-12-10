package org.example.DTOS;

public class ProductDTO {
    private Long id;
    private String nome;
    private String url;

    public ProductDTO(Long id, String nome, String url) {
        this.id = id;
        this.nome = nome;
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}

