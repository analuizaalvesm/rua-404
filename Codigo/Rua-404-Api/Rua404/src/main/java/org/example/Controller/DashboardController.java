package org.example.Controller;

import java.math.BigDecimal;

import org.apache.catalina.connector.Response;
import org.example.Service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/total-vendas-por-periodo")
    public ResponseEntity<?> totalDeVendasPorPeriodo(@RequestParam String tempo){
        BigDecimal response;
        switch (tempo.toLowerCase()) {
            case "dia":
                response=this.dashboardService.totalValuenInOneDay();
                break;
            case "semana":
                response=this.dashboardService.totalValueInWeek();
            break;
            case "mes":
                response=this.dashboardService.totalValueInMonth();
                break;
            default:
                return ResponseEntity.badRequest().body("Opção de tempo invalida (dia-semana-mes)");
        }    
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("tota-users")
    public ResponseEntity<?> totalUsers(){
        BigDecimal response= this.dashboardService.totalUsers();
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("total-pedidos-fechados")
    public ResponseEntity<?> totalPedidosFechados(){
        Long response=this.dashboardService.totalPedidosFechados();
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("total-de-vendas")
    public ResponseEntity<?> valorTotalDeVendas(){
        BigDecimal response=this.dashboardService.totalValorDeVendas();
        return ResponseEntity.ok().body(response);
    }
}
