package com.example.webshopbackend2.dao;

import com.example.webshopbackend2.models.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {
    List<OrderLine> findByCustomOrderId(long orderId);
}
