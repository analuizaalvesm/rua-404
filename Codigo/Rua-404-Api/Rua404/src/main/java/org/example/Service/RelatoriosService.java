package org.example.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;
import java.util.StringJoiner;
import org.example.Model.Customer;
import org.example.Model.Order;
import org.example.Model.Product;
import org.example.Repositories.CustomerRepository;
import org.example.Repositories.OrderRepository;
import org.example.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RelatoriosService{
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    ProductRepository productRepository;

   public Document generatePDF(String report) throws FileNotFoundException, DocumentException {
    String fileName="Relatorio.pdf";
    Document pdfDocument = new Document();
    PdfWriter.getInstance(pdfDocument, new FileOutputStream(fileName));
    pdfDocument.open();
    
    try {
        Image logo = Image.getInstance("Codigo//Rua-404-Api//Rua404//src//main//java//org//example//img//RuaDoggieNormal.png");
        logo.scaleToFit(100, 100);
        logo.setAlignment(Image.ALIGN_CENTER);
        pdfDocument.add(logo);
    } catch (Exception e) {
        e.printStackTrace();
    }
    
    Font font = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
    String[] lines = report.split("\n");
    
    for (String line : lines) {
        Paragraph paragraph = new Paragraph(line, font);
        pdfDocument.add(paragraph);
    }
    
    pdfDocument.close();
    return pdfDocument;
}

public String generateOrdersReport() {
    List<Order> listaDePedidos = this.orderRepository.findAll();

    StringBuilder relatorio = new StringBuilder();
    for (Order order : listaDePedidos) {

        StringJoiner produtos = new StringJoiner(", ");
        for (Product produto : order.getProdutos()) {
            produtos.add(produto.getName());
        }
        String linha = "Pedido: " + order.getId() +
                       " Produtos: " + produtos.toString() +
                       " Data: " + order.getData() +
                       " Cliente: " + order.getUsuario().getEmail() +
                       " Total: " + order.getValorTotal() +
                       " Status: " + order.getStatus();
        relatorio.append(linha).append("\n");
    }
    return relatorio.toString();
}


    public String generateUsersReport(){
      List<Customer> listaDeClientes=this.customerRepository.findAll();

      StringBuilder userReport= new StringBuilder();
      for (Customer customer : listaDeClientes) {
        String linha=
        " Nome: "+customer.getFirst_name()+" "+customer.getLast_name()+
        " CPF: "+customer.getCpf()+
        " Telefone: "+customer.getTelefone()+
        " e-mail"+customer.getEmail()+
        " Data de nascimento "+customer.getDataNascimento()+
        " Data de cadastro "+customer.getCreate_data()+
        " Endereço : Rua: "+customer.getAddress().getRua()+" bairro: "+customer.getAddress().getBairro()+" n° "+customer.getAddress().getNumero();
         userReport.append(linha).append("\n");
      } 
      return userReport.toString();
    }

    public String generateStockReport(){
        List<Product> listaDeProdutos=this.productRepository.findAll();
        StringBuilder stockReport= new StringBuilder();

        for (Product product : listaDeProdutos) {
        String linha=
        " Produto "+product.getName()+
        " Collab "+product.getCollab()+
        " Quantidade "+product.getQuantity();
        stockReport.append(linha).append("\n");
        }
        return stockReport.toString();
    }
}



