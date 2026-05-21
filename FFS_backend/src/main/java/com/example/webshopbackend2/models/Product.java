package com.example.webshopbackend2.models;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JsonManagedReference
    private Category category;
    private String taste;
    private String brand;
    private double price;
    private String url;
    private int stock;
    @JsonAlias("is_deleted")
    private boolean isDeleted;
    @Column(length = 1000)
    private String ingredients;
    @JsonAlias("amount_in_grams")
    private int amountInGrams;
    @JsonAlias("protein_per_portion")
    private int proteinPerPortion;
    @OneToMany(
            mappedBy = "product",
            cascade = {CascadeType.ALL}
    )
    @JsonBackReference
    private List<OrderLine> orderLines;

    public Product(Category category, String taste, String brand, double price, String url,
                   int stock, boolean isDeleted, String ingredients, int amountInGrams, int proteinPerPortion) {
        this.category = category;
        this.taste = taste;
        this.brand = brand;
        this.price = price;
        this.url = url;
        this.stock = stock;
        this.isDeleted = isDeleted;
        this.ingredients = ingredients;
        this.amountInGrams = amountInGrams;
        this.proteinPerPortion = proteinPerPortion;

    }

    public Product() {
    }

    public List<OrderLine> getOrderLines() {
        return this.orderLines;
    }

    public void setOrderLines(List<OrderLine> orderLines) {
        this.orderLines = orderLines;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isDeleted() {
        return this.isDeleted;
    }

    public void setDeleted(boolean deleted) {
        this.isDeleted = deleted;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTaste() {
        return this.taste;
    }

    public void setTaste(String taste) {
        this.taste = taste;
    }

    public String getBrand() {
        return this.brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getStock() {
        return this.stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public int getAmountInGrams() {
        return amountInGrams;
    }

    public void setAmountInGrams(int amountInGrams) {
        this.amountInGrams = amountInGrams;
    }

    public int getProteinPerPortion() {
        return proteinPerPortion;
    }

    public void setProteinPerPortion(int proteinPerPortion) {
        this.proteinPerPortion = proteinPerPortion;
    }
}
