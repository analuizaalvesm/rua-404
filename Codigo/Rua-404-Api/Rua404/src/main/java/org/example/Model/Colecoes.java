package org.example.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "colecoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Colecoes{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_collabs")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "text")  
    private String texto;
}
