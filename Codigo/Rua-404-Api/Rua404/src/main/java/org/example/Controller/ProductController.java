package org.example.Controller;

import java.util.List;
import java.util.Optional;

import org.example.Model.Product;
import org.example.Service.ProductService;
import org.example.Service.StockManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private StockManagementService sotckService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id){
        Optional<Product> product = productService.getProductById(id);
        if(product.isPresent()){
            return ResponseEntity.ok(product.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
       Product createdProduct = productService.createProduct(product);
       return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }   

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product upatedProduct){
        try {
            Product product = productService.updateProduct(id, upatedProduct);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeProduct(@PathVariable("id") Long id){
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{id}/stock-entry") public ResponseEntity<?> stockEntry(@PathVariable Long id, @RequestParam int quantity) { 
        try { 
            Product updatedProduct =this.sotckService.processStockEntry(id, quantity); return ResponseEntity.ok(updatedProduct.getQuantity()); 
        } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()); 
            }
        }
        @PostMapping("/{id}/stock-exit")
        public ResponseEntity<?> stockExit(@PathVariable Long id, @RequestParam int quantity) {
             try {
                Product updatedProduct = this.sotckService.processStockExit(id, quantity); 
                return ResponseEntity.ok(updatedProduct.getQuantity()); 
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
             }
            }
        }
    

