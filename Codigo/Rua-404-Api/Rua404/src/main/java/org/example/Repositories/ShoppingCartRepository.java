package org.example.Repositories;

import org.example.Model.Order;
import org.example.Model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT u FROM Pedido u WHERE u.email = :email")
    public List<Pedido> findAllByEmail(String email);
}
