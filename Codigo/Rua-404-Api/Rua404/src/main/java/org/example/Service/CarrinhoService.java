package org.example.Service;

import org.example.Enum.OrderStatus;
import org.example.Model.*;
import org.example.Repositories.CarrinhoRepository;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    public List<Carrinho> get() {
        return carrinhoRepository.findAll();
    }

    public Carrinho getByUserId(Long userId) {
        return carrinhoRepository.findAllByUserId(userId);
    }

    public Carrinho getById(Long id) {
        return carrinhoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado com id: " + id));
    }

    public String post(Product produto, Long userId) {
        try {
            Customer user = customerRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + userId));

            ShoppingCart shoppingCart = new ShoppingCart();
            shoppingCart.setNomeProduto(produto.getName());
            shoppingCart.setQuantidade(produto.getQuantity());
            shoppingCart.setValorPorProduto(produto.getPrice());
            shoppingCart.setDataPedido(new Date());
            shoppingCart.setUrl(produto.getUrl());

            shoppingCartRepository.save(shoppingCart);

            Carrinho carrinho = carrinhoRepository.findAllByUserId(user.getCustomer_id());
            carrinho.getShoppingCart().add(shoppingCart);

            BigDecimal novoValorTotal = BigDecimal.ZERO;

            for (ShoppingCart shop : carrinho.getShoppingCart()) {
                novoValorTotal = novoValorTotal.add(
                        produto.getPrice().multiply(BigDecimal.valueOf(produto.getQuantity()))
                );
            }
            carrinho.setValorTotal(novoValorTotal);

            carrinhoRepository.save(carrinho);

            return HttpStatus.OK.toString();
        } catch (RuntimeException e) {
            throw new RuntimeException("Não foi possível adicionar ao carrinho", e);
        }
    }

    public String delete(Long id) {
        try {
            carrinhoRepository.deleteById(id);
            return HttpStatus.OK.toString();
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString();
        }
    }

    public Carrinho put(Carrinho carrinhoAtualizado, Long id) {
        return carrinhoRepository.findById(id).map(
                carrinho -> {
                    carrinho.setValorTotal(carrinhoAtualizado.getValorTotal());
                    carrinho.setShoppingCart(carrinhoAtualizado.getShoppingCart());
                    return carrinhoRepository.save(carrinho);
                }).orElseThrow(() -> new RuntimeException("Carrinho não encontrado com id: " + id));
    }

    public void fecharCarrinho(Carrinho carrinho) {
        try {
            List<Product> produtos = new ArrayList<>();

            for (ShoppingCart item : carrinho.getShoppingCart()) {
                Product produto = new Product(
                        item.getNomeProduto(),
                        item.getQuantidade(),
                        item.getValorPorProduto()
                );
                produtos.add(produto);

                productService.updateQuantity(item.getId(), item.getQuantidade());
            }

            Order pedidoNovo = new Order(carrinho, produtos);
            orderService.savePedido(pedidoNovo, carrinho.getUser().getCustomer_id());

            carrinhoRepository.delete(carrinho);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao fechar o carrinho", e);
        }
    }
}
