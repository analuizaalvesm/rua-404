package org.example.Repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.Model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> { 
}
