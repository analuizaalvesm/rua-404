package org.example.Repositories;

import org.example.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
    @Query("SELECT u FROM Customer u WHERE u.email = :email")
    Customer findByEmailAsync(@Param("email")String email);
}
