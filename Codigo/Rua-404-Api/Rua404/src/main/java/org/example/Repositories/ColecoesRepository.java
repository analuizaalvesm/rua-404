package org.example.Repositories;

import org.example.Model.Colecoes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColecoesRepository extends JpaRepository<Colecoes, Long> {
    
}
