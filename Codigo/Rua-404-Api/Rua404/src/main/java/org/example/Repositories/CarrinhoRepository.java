package org.example.Repositories;

import org.example.Model.Carrinho;
import org.example.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

    /**
     * Encontra todos os carrinhos associados a um usuário específico.
     *
     * @param userId ID do usuário.
     * @return Lista de carrinhos associados ao usuário.
     */
    @Query("SELECT c FROM Carrinho c WHERE c.user.customer_id = :userId")
    Carrinho findAllByUserId(@Param("userId") Long userId);

    /**
     * Encontra um carrinho específico por seu ID.
     *
     * @param id ID do carrinho.
     * @return Carrinho encontrado ou vazio.
     */
    @Query("SELECT c FROM Carrinho c WHERE c.id = :id")
    Optional<Carrinho> findById(@Param("id") Long id);


}
