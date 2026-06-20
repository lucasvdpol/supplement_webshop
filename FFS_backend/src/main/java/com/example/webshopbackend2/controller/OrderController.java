package com.example.webshopbackend2.controller;

import com.example.webshopbackend2.dao.OrderDAO;
import com.example.webshopbackend2.dto.OrderDTO;
import com.example.webshopbackend2.models.CustomOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/order"})
@CrossOrigin(
        origins = {"http://localhost:4200", "http://s1156206.student.inf-hsleiden.nl:16206", "https://webshop.lucasvandepol.com"}
)
public class OrderController {
    private OrderDAO orderDAO;

    public OrderController(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    @PostMapping
    public ResponseEntity<CustomOrder> createOrder(@RequestBody OrderDTO orderDTO) {
        CustomOrder customOrder = this.orderDAO.createOrder(orderDTO);
        return ResponseEntity.ok(customOrder);
    }

    @GetMapping({"/{email}"})
    public ResponseEntity<List<CustomOrder>> getOrdersByEmail(@PathVariable String email) {
        List<CustomOrder> orders = this.orderDAO.getOrdersByEmail(email);
        return ResponseEntity.ok(orders);
    }
}
