package org.example.Controller;

import org.example.Model.Product;
import org.example.Model.ShoppingCart;
import org.example.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/carinho")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping
    public ResponseEntity<List<ShoppingCart>> getAll(Long id) {
        try {
            List<ShoppingCart> products = shoppingCartService.getByUserId(id);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> addAtCart(@RequestBody Product product, @RequestParam Long id){
        try {
             this.shoppingCartService.post(product, id);
           return  ResponseEntity.ok().body("Produto adicionado ao carrinho");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<ShoppingCart> editCart(ShoppingCart carrinho){
        try {
            ShoppingCart cart = shoppingCartService.put(carrinho);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteCart(Long id){
        try {
            shoppingCartService.delete(id);
            return ResponseEntity.ok(HttpStatus.OK.toString());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
