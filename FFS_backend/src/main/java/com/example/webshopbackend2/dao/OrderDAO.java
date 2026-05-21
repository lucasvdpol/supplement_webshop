package com.example.webshopbackend2.dao;

import com.example.webshopbackend2.config.JWTFilter;
import com.example.webshopbackend2.config.JWTUtil;
import com.example.webshopbackend2.dto.OrderDTO;
import com.example.webshopbackend2.models.CustomOrder;
import com.example.webshopbackend2.models.CustomUser;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class OrderDAO {
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private JWTFilter jwtFilter;
    private JWTUtil jwtUtil;

    public OrderDAO(OrderRepository orderRepository, UserRepository userRepository, JWTFilter jwtFilter, JWTUtil jwtUtil) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.jwtFilter = jwtFilter;
        this.jwtUtil = jwtUtil;
    }

    public CustomOrder createOrder(OrderDTO orderDTO) {
        Optional<CustomUser> optionalCustomUser = Optional.ofNullable(this.userRepository.findByEmail(orderDTO.email));
        if (optionalCustomUser.isPresent()) {
            CustomUser customUser = (CustomUser)optionalCustomUser.get();
            CustomOrder customOrder = new CustomOrder(
                    customUser, orderDTO.email, orderDTO.date, orderDTO.total, "SUCCESS",
                    orderDTO.address, orderDTO.postcode, orderDTO.city, orderDTO.firstname, orderDTO.lastname);
            this.orderRepository.save(customOrder);
            return customOrder;
        } else {
            CustomOrder customOrder = new CustomOrder(
                    orderDTO.email, orderDTO.date, orderDTO.total, "SUCCESS",
                    orderDTO.address, orderDTO.postcode, orderDTO.city, orderDTO.firstname, orderDTO.lastname
            );
            this.orderRepository.save(customOrder);
            return customOrder;
        }
    }

    public List<CustomOrder> getOrdersByEmail(String email) {
        String JWTToken = this.jwtFilter.getJWTToken();
        if(Objects.equals(this.jwtUtil.validateTokenAndRetrieveSubject(JWTToken), email)){
            return this.orderRepository.findByEmail(email);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Geen toegang tot deze email");
    }
}
