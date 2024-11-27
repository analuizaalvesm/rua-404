package org.example.Repositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.example.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT SUM(o.valorTotal) FROM Order o WHERE o.data >= :startDate")
    public BigDecimal findValorTotalByPeriod(@Param("startDate")LocalDate startDate);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'ENVIADO'")
    public Long findTotalPedidosFechados();

    @Query("SELECT SUM(o.valorTotal) FROM Order o WHERE o.status = 'ENVIADO'")
    public BigDecimal totalValorVendas();

    @Query(value = "SELECT * FROM Pedidos o WHERE o.usuario_id = :usuarioId", nativeQuery = true)
    List<Order> findOrdersByCustomerId(@Param("usuarioId") Long usuarioId);
}
