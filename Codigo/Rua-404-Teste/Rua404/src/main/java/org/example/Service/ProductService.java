package org.example.Service;

import java.util.List;
import java.util.Optional;

import org.example.Model.Product;
import org.example.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(@PathVariable Long id){
        try {
            return productRepository.findById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException("Produto não encontrado com ID:" + id);
        }
    }

    public Product createProduct(Product product){  
        try {
            return productRepository.save(product);
        } catch (RuntimeException e) {
            throw new RuntimeException("Não foi possivel adicionar Produto");
        }
    }

    public Product updateProduct(Long id, Product updatedProduct){
        Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id));
            
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setLastUpdated(updatedProduct.getLastUpdated());
            existingProduct.setUrl(updatedProduct.getUrl());
            
            return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id){
        try {
            productRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException("Não foi possivel excluir o Produto");
        }
    }
    
}
