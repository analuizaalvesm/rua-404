package org.example.Service;

import org.example.Model.Customer;
import org.example.Model.Pedido;
import org.example.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public List<Pedido> get(){
        return shoppingCartRepository.findAll();
    }

    public List<Pedido> getByEmail(String email){
        try{
            return shoppingCartRepository.findAllByEmail(email);
        }catch(Exception e){
            return null;
                    //List<HttpStatus.BAD_REQUEST.toString()>; //retorna um erro 400
        }
    }

//    public String post(Pedido pedido){
//       try{
//           if(pedido.getEmail() == null){
//               return HttpStatus.BAD_REQUEST.toString();
//           }
//           shoppingCartRepository.save(pedido);
//           return HttpStatus.OK + pedido.toString();
//
//       }catch (Exception e){
//           return HttpStatus.BAD_REQUEST.toString();
//       }
//    }

    public String delete(Long id){
        try{
            shoppingCartRepository.deleteById(id);
            return HttpStatus.OK.toString();
        }catch (Exception e){
            return HttpStatus.BAD_REQUEST.toString();
        }
    }

    public String put(Pedido pedido){
        try {
            shoppingCartRepository.save(pedido);
            return HttpStatus.OK.toString();
        }
        catch (Exception e){
            return HttpStatus.BAD_REQUEST.toString();
        }
    }



}
