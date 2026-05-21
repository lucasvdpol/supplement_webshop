package com.example.webshopbackend2.dto;

import com.example.webshopbackend2.models.Category;
import com.fasterxml.jackson.annotation.JsonAlias;

public class ProductDTO {
//    @JsonAlias({"category"})
    public String categoryName;
    public String taste;
    public String brand;
    public float price;
    public String url;
    public int stock;
    public boolean isDeleted;
    public String ingredients;
    public int amountInGrams;
    public int proteinPerPortion;

    public ProductDTO(String categoryName, String taste, String brand, float price, String url, int stock,
                      boolean isDeleted, String ingredients, int amountInGrams, int proteinPerPortion) {
        this.categoryName = categoryName;
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

    public ProductDTO() {
    }
}
