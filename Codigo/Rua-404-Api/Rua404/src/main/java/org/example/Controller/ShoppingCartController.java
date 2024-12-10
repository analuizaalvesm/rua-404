package org.example.Controller;

import java.util.List;

import org.example.Model.Product;
import org.example.Model.ShoppingCart;
import org.example.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carrinho")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    /**
     * Obtém todos os carrinhos de um usuário pelo ID do usuário.
     *
     * @paramD do usuário.
     * @return Lista de carrinhos.
     */
    @GetMapping
    public ResponseEntity<List<ShoppingCart>> getAll(Long id) {

        List<ShoppingCart> products = shoppingCartService.getByUserId(id);
        return ResponseEntity.ok(products);
    }

    /**
     * Adiciona um produto ao carrinho de um usuário.
     *
     * @param product Produto a ser adicionado.
     * @param
     * @return Mensagem de sucesso ou erro.
     */
    @PostMapping
    public ResponseEntity<String> addAtCart(@RequestBody Product product, @RequestParam Long id) {
        try {
            this.shoppingCartService.post(product, id);
            return ResponseEntity.ok().body("Produto adicionado ao carrinho");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Atualiza um carrinho pelo ID.
     *
     * @paramDados atualizados do carrinho.
     * @paracarrinhoId ID do carrinho a ser atualizado.
     * @return Carrinho atualizado.
     */
    @PutMapping
    public ResponseEntity<ShoppingCart> editCart(ShoppingCart carrinho, Long idCarrinho) {
        try {
            ShoppingCart cart = shoppingCartService.put(carrinho, idCarrinho);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/checkout")
    public ResponseEntity<?> changePassword(@RequestParam Long clienteId){
        return ResponseEntity.ok().body(this.shoppingCartService.checkout(clienteId));
    }

    /**
     * Deleta um carrinho pelo ID.
     *
     * @paramdo carrinho a ser deletado.
     * @return Mensagem de sucesso ou erro.
     */
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
