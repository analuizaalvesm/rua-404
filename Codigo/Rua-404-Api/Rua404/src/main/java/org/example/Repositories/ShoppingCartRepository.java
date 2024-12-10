package org.example.Repositories;

import java.util.List;
import java.util.Optional;

import org.example.Model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    @Query("SELECT u FROM ShoppingCart u WHERE u.id = :id")
    Optional<ShoppingCart> findById(@Param("id")Long id);

    @Query("SELECT u FROM ShoppingCart u WHERE u.user.customer_id = :id")
    List<ShoppingCart> findAllByUserID(@Param("id")Long id);

    public List<ShoppingCart> findByCarrinhoId(Long id);
}
