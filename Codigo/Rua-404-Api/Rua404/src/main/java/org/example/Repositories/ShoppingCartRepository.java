package org.example.Repositories;

import org.example.Model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    @Query("SELECT u FROM ShoppingCart u WHERE u.id = :id")
    List<ShoppingCart> findAllByUserID(String id);

}
