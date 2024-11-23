package org.example.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.example.Repositories.CustomerRepository;
import org.example.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public BigDecimal totalValuenInOneDay(){
        LocalDate today= LocalDate.now();
        return orderRepository.findValorTotalByPeriod(today);
    }
    
    public BigDecimal totalValueInWeek(){
        LocalDate week=LocalDate.now().minusDays(7);
        return orderRepository.findValorTotalByPeriod(week);
    }
    public BigDecimal totalValueInMonth(){
        LocalDate month=LocalDate.now().minusMonths(1);
        return orderRepository.findValorTotalByPeriod(month);
    }
    public BigDecimal totalUsers(){
        return this.customerRepository.totalUsers();
    }
    public Long totalPedidosFechados(){
        return this.orderRepository.findTotalPedidosFechados();
    }
    public BigDecimal totalValorDeVendas(){
        return this.orderRepository.totalValorVendas();
    }
        
    }

