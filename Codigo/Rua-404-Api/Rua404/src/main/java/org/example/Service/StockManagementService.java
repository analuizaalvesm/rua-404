package org.example.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.example.Model.Product;
import org.example.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockManagementService {

    @Autowired
    private ProductRepository productRepository;

    public Product processStockEntry(Long productId, int quantity) throws Exception {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        
        if (!optionalProduct.isPresent()) {
            throw new Exception("Produto não encontrado");
        }

        Product product = optionalProduct.get();
        product.setQuantity(product.getQuantity() + quantity);
        product.setLastUpdated(LocalDateTime.now());

        return productRepository.save(product);
    }

    public Product processStockExit(Long productId, int quantity) throws Exception {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        
        if (!optionalProduct.isPresent()) {
            throw new Exception("Produto não encontrado");
        }

        Product product = optionalProduct.get();

        if (product.getQuantity() < quantity) {
            throw new Exception("Quantidade em estoque insuficiente");
        }

        product.setQuantity(product.getQuantity() - quantity);
        product.setLastUpdated(LocalDateTime.now());

        return productRepository.save(product);
    }
}


