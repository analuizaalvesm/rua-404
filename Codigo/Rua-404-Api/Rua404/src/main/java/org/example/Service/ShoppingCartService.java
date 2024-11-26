package org.example.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.example.Model.Order;
import org.example.Model.Pedido;
import org.example.Model.Product;
import org.example.Model.ShoppingCart;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    public List<ShoppingCart> get() {
        return shoppingCartRepository.findAll();
    }

    public List<ShoppingCart> getByUserId(Long id) {
        return shoppingCartRepository.findAllByUserID(id);
    }

    public ShoppingCart getById(Long id) {
        return shoppingCartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado com id: " + id));
    }

    public String post(Product pedido, Long id) {
        try {
            ShoppingCart carrinho = new ShoppingCart();

            carrinho.setNomeProduto(pedido.getName());
            carrinho.setQuantidade(pedido.getQuantity());
            carrinho.setValorPorProduto(pedido.getPrice());
            carrinho.setValorTotal(pedido.getPrice().multiply(BigDecimal.valueOf(pedido.getQuantity())));
            carrinho.setDataPedido(new Date());
            carrinho.setUrl(pedido.getUrl());
            carrinho.setUser(customerRepository.getByID(id));
            shoppingCartRepository.save(carrinho);

            return "";
        } catch (RuntimeException e) {
            throw new RuntimeException("Não foi possível adicionar Cliente");
        }
    }

    public String delete(Long id) {
        try {
            shoppingCartRepository.deleteById(id);
            return HttpStatus.OK.toString();
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString();
        }
    }

    public ShoppingCart put(ShoppingCart pedido, Long id) {
        return shoppingCartRepository.findById(id).map(
                shoppingCart -> {
                    shoppingCart.setQuantidade(pedido.getQuantidade());
                    shoppingCart.setStatus(pedido.getStatus());
                    return shoppingCartRepository.save(shoppingCart);
                }).orElseThrow(() -> new RuntimeException("error doidao"));
    }

    public void fecharCarrinho(ShoppingCart carrinho){
        Product produto = new Product(
                carrinho.getNomeProduto()
        );

        Order pedidoNovo = new Order(carrinho, "Aguardando Pagamento", produto);
        orderService.savePedido(pedidoNovo, carrinho.getUser().getCustomer_id());
        this.delete(carrinho.getId());


        productService.updateQuantity(carrinho.getId(), carrinho.getQuantidade());


    }

}
