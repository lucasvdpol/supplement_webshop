package com.example.webshopbackend2.controller;

import com.example.webshopbackend2.dao.OrderLineDAO;
import com.example.webshopbackend2.dto.OrderLineDTO;
import com.example.webshopbackend2.models.OrderLine;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/orderline"})
@CrossOrigin(
        origins = {"http://localhost:4200", "http://s1156206.student.inf-hsleiden.nl:16206"}
)
public class OrderLineController {
    private OrderLineDAO orderLineDAO;

    public OrderLineController(OrderLineDAO orderLineDAO) {
        this.orderLineDAO = orderLineDAO;
    }

    @PostMapping
    public ResponseEntity<String> createOrderLine(@RequestBody OrderLineDTO orderLineDTO) {
        this.orderLineDAO.createOrderLine(orderLineDTO);
        return ResponseEntity.ok("New orderline created");
    }

    @GetMapping({"/{orderId}"})
    public ResponseEntity<List<OrderLine>> getOrderLinesByOrderId(@PathVariable long orderId) {
        return ResponseEntity.ok(this.orderLineDAO.getOrderLinesByOrderId(orderId));
    }
}

