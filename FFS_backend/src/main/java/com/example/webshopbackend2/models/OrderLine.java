package com.example.webshopbackend2.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderLine {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JsonBackReference
    private CustomOrder customOrder;
    @ManyToOne
    @JsonManagedReference
    private Product product;
    private int amount;
    private double subtotal;

    public OrderLine(CustomOrder customOrder, Product product, int amount, double subtotal) {
        this.customOrder = customOrder;
        this.product = product;
        this.amount = amount;
        this.subtotal = subtotal;
    }

    public OrderLine() {
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setOrder(CustomOrder customOrder) {
        this.customOrder = customOrder;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getSubtotal() {
        return this.subtotal;
    }

    public void setSubtotal(float subtotal) {
        this.subtotal = (double)subtotal;
    }
}

