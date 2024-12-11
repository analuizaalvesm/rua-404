package org.example.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.example.Model.Carrinho;
import org.example.Model.Order;
import org.example.Model.Pedido;
import org.example.Model.Product;
import org.example.Model.ShoppingCart;
import org.example.Repositories.CarrinhoRepository;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.example.Enum.OrderStatus;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    CarrinhoRepository carrinhoRepository;

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

            Carrinho c= carrinhoRepository.findAllByUserId(id);

            carrinho.setNomeProduto(pedido.getName());
            carrinho.setQuantidade(pedido.getQuantity());
            carrinho.setValorPorProduto(pedido.getPrice());
            carrinho.setValorTotal(pedido.getPrice().multiply(BigDecimal.valueOf(pedido.getQuantity())));
            carrinho.setDataPedido(new Date());
            carrinho.setUrl(pedido.getUrl());
            carrinho.setUser(customerRepository.getByID(id));
            carrinho.setCarrinho(c);
            shoppingCartRepository.save(carrinho);

            return "";
        } catch (RuntimeException e) {
            throw new RuntimeException("Não foi possível adicionar Cliente");
        }
    }
    public Order checkout(long clienteId){
    
        Carrinho c=this.carrinhoRepository.findAllByUserId(clienteId);

        List<Product> produtos = productService.getAllProducts();
        List<ShoppingCart> listaDeProdutos=this.shoppingCartRepository.findByCarrinhoId(c.getId());
        List<Product> produtosPedido=new ArrayList<>();

        for(ShoppingCart item : listaDeProdutos){
            for(Product prod : produtos){
                if(item.getNomeProduto().equals(prod.getName())){
                    productService.updateQuantity(prod.getId(),item.getQuantidade());
                    produtosPedido.add(prod);
                }
            }
        }
        Order newPedido=new Order(c, produtosPedido);
        orderService.savePedido(newPedido, clienteId);

        c.getShoppingCart().clear();
        carrinhoRepository.save(c);
    

        return newPedido;

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
}
