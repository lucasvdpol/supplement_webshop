package com.example.webshopbackend2.dao;

import com.example.webshopbackend2.models.CustomOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<CustomOrder, Long> {
    List<CustomOrder> findByEmail(String email);
}