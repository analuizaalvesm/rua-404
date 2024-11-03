package org.example.Service;

import java.util.List;
import java.util.Optional;

import org.example.Model.ShoppingCart;
import org.example.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public List<ShoppingCart> get() {
        return shoppingCartRepository.findAll();
    }

    public Optional<ShoppingCart> getByUserId(Long id) {
        try {
            return shoppingCartRepository.findById(id);
        } catch (Exception e) {
            return null;
            //List<HttpStatus.BAD_REQUEST.toString()>; //retorna um erro 400
        }
    }

    public ShoppingCart post(ShoppingCart pedido) {
        try {
            return this.shoppingCartRepository.save(pedido);
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

    public ShoppingCart put(ShoppingCart pedido) {
        try {
            return shoppingCartRepository.save(pedido);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to update ShoppingCart", e);
        }
    }

}
