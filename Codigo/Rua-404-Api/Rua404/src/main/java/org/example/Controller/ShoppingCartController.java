package org.example.Controller;

import java.util.List;

import org.example.Model.Carrinho;
import org.example.Model.Product;
import org.example.Service.CarrinhoService;
import org.example.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carrinho")
public class ShoppingCartController {

    @Autowired
    private CarrinhoService carrinhoService;

    /**
     * Obtém todos os carrinhos de um usuário pelo ID do usuário.
     *
     * @param userId ID do usuário.
     * @return Lista de carrinhos.
     */
    @GetMapping
    public ResponseEntity<List<Carrinho>> getAllByUser(@RequestParam Long userId) {
        try {
            List<Carrinho> carrinhos = carrinhoService.getByUserId(userId);
            return ResponseEntity.ok(carrinhos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Adiciona um produto ao carrinho de um usuário.
     *
     * @param product Produto a ser adicionado.
     * @param userId  ID do usuário.
     * @return Mensagem de sucesso ou erro.
     */
    @PostMapping
    public ResponseEntity<String> addToCart(@RequestBody Product product, @RequestParam Long userId) {
        try {
            carrinhoService.post(product, userId);
            return ResponseEntity.ok("Produto adicionado ao carrinho");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao adicionar produto ao carrinho");
        }
    }

    /**
     * Atualiza um carrinho pelo ID.
     *
     * @param carrinhoAtualizado Dados atualizados do carrinho.
     * @param carrinhoId         ID do carrinho a ser atualizado.
     * @return Carrinho atualizado.
     */
    @PutMapping
    public ResponseEntity<Carrinho> updateCart(@RequestBody Carrinho carrinhoAtualizado, @RequestParam Long carrinhoId) {
        try {
            Carrinho carrinho = carrinhoService.put(carrinhoAtualizado, carrinhoId);
            return ResponseEntity.ok(carrinho);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Deleta um carrinho pelo ID.
     *
     * @param carrinhoId ID do carrinho a ser deletado.
     * @return Mensagem de sucesso ou erro.
     */
    @DeleteMapping
    public ResponseEntity<String> deleteCart(@RequestParam Long carrinhoId) {
        try {
            carrinhoService.delete(carrinhoId);
            return ResponseEntity.ok("Carrinho deletado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao deletar carrinho");
        }
    }

    /**
     * Fecha um carrinho e cria um pedido.
     *
     * @param carrinhoId ID do carrinho a ser fechado.
     * @return Mensagem de sucesso ou erro.
     */
    @PostMapping("/fecharCarrinho")
    public ResponseEntity<String> fecharCarrinho(@RequestParam Long carrinhoId) {
        try {
            Carrinho carrinho = carrinhoService.getById(carrinhoId);
            carrinhoService.fecharCarrinho(carrinho);
            return ResponseEntity.ok("Carrinho fechado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao fechar carrinho");
        }
    }
}
