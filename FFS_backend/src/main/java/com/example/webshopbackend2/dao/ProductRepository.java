package com.example.webshopbackend2.dao;

import com.example.webshopbackend2.models.Category;
import com.example.webshopbackend2.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsDeletedFalse();
}
