package com.example.webshopbackend2.dao;

import com.example.webshopbackend2.dto.OrderLineDTO;
import com.example.webshopbackend2.models.CustomOrder;
import com.example.webshopbackend2.models.OrderLine;
import com.example.webshopbackend2.models.Product;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class OrderLineDAO {
    private OrderLineRepository orderLineRepository;
    private OrderRepository orderRepository;
    private ProductRepository productRepository;

    public OrderLineDAO(OrderLineRepository orderLineRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderLineRepository = orderLineRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public void createOrderLine(OrderLineDTO orderLineDTO) {
        Optional<CustomOrder> optionalOrder = this.orderRepository.findById(orderLineDTO.orderId);
        Optional<Product> optionalProduct = this.productRepository.findById(orderLineDTO.productId);
        if (optionalProduct.isPresent() && optionalOrder.isPresent()) {
            Product product = (Product)optionalProduct.get();
            CustomOrder customOrder = (CustomOrder)optionalOrder.get();
            if (product.getStock() < orderLineDTO.amount) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough stock available");
            }
            product.setStock(product.getStock() - orderLineDTO.amount);
            this.productRepository.save(product);
            OrderLine orderLine = new OrderLine(customOrder, product, orderLineDTO.amount, orderLineDTO.subtotal);
            this.orderLineRepository.save(orderLine);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Id not found");
        }
    }

    public List<OrderLine> getOrderLinesByOrderId(long orderId) {
        return this.orderLineRepository.findByCustomOrderId(orderId);
    }
}
