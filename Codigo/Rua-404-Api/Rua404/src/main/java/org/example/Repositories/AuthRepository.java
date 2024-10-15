package org.example.Repositories;

import jakarta.transaction.Transactional;
import org.example.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Customer, Long>{
    @Query("SELECT u FROM Customer u WHERE u.email = :email")
    Customer findByEmailAsync(@Param("email")String email);

    @Query("SELECT u FROM Customer u WHERE u.email = :email AND u.recuperationCode = :recuperationCode")
    Customer findByEmailAndCode(String email, String recuperationCode);

    @Query("SELECT u FROM Customer u WHERE u.loginToken = :loginToken")
    Customer findByToken(String login);

    @Query("UPDATE Customer u SET u.email = :novoEmail WHERE u.email = :email")
    Customer updateByEmail(String email, String novoEmail);

    @Transactional
    @Modifying
    @Query("DELETE FROM Customer u WHERE u.email = :email")
    void deleteByEmail(String email);
}
