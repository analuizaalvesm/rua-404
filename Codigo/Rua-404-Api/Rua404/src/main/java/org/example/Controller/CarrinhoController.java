package org.example.Controller;

import org.example.Model.Carrinho;
import org.example.Model.Product;
import org.example.Model.ShoppingCart;
import org.example.Service.CarrinhoService;
import org.example.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/novoCarrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService shoppingCartService;
    /**
     * Obtém todos os carrinhos de um usuário pelo ID do usuário.
     *
     * @paramD do usuário.
     * @return Lista de carrinhos.
     */
    @GetMapping("/userId")
    public ResponseEntity<Carrinho> getAllByUserId(Long id) {

      Carrinho products = shoppingCartService.getByUserId(id);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/carrinhoId")
    public ResponseEntity<Carrinho> getAllByCarrinhoId(Long id) {

        Carrinho products = shoppingCartService.getById(id);
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
     * @paracarrinhoId         ID do carrinho a ser atualizado.
     * @return Carrinho atualizado.
     */
    @PutMapping
    public ResponseEntity<Carrinho> editCart(Carrinho carrinho, Long idCarrinho) {
        try {
            Carrinho cart = shoppingCartService.put(carrinho, idCarrinho);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
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

    @PostMapping("/fecharCarrinho")
    public ResponseEntity<String> fecharCarrinho(@RequestBody Carrinho carrinho) {
        try {
            shoppingCartService.fecharCarrinho(carrinho);
            return ResponseEntity.ok(HttpStatus.OK.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
