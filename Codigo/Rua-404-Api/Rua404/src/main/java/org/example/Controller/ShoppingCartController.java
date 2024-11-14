package org.example.Controller;

import java.util.List;

import org.example.Model.Product;
import org.example.Model.ShoppingCart;
import org.example.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/carinho")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping
    public ResponseEntity<List<ShoppingCart>> getAll(Long id) {
        
            List<ShoppingCart> products = shoppingCartService.getByUserId(id);
            return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<String> addAtCart(@RequestBody Product product, @RequestParam Long id) {
        try {
            this.shoppingCartService.post(product, id);
            return ResponseEntity.ok().body("Produto adicionado ao carrinho");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<ShoppingCart> editCart(ShoppingCart carrinho, Long idCarrinho) {
        try {
            ShoppingCart cart = shoppingCartService.put(carrinho, idCarrinho);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteCart(Long id) {
        try {
            shoppingCartService.delete(id);
            return ResponseEntity.ok(HttpStatus.OK.toString());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
