package org.example.Service;

import org.example.Model.ShoppingCart;
import org.example.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public List<ShoppingCart> get(){
        return shoppingCartRepository.findAll();
    }

    public List<ShoppingCart> getByUserId(String userId){
        try{
            return shoppingCartRepository.findAllByUserID(userId);
        }catch(Exception e){
            return null;
        }
    }

    public String post(ShoppingCart pedido){
       try{

           shoppingCartRepository.save(pedido);
           return HttpStatus.OK + pedido.toString();

       }catch (Exception e){
           return HttpStatus.BAD_REQUEST.toString();
       }
    }

    public String delete(Long id){
        try{
            shoppingCartRepository.deleteById(id);
            return HttpStatus.OK.toString();
        }catch (Exception e){
            return HttpStatus.BAD_REQUEST.toString();
        }
    }

    public String put(ShoppingCart pedido){
        try {
            shoppingCartRepository.save(pedido);
            return HttpStatus.OK.toString();
        }
        catch (Exception e){
            return HttpStatus.BAD_REQUEST.toString();
        }
    }



}
