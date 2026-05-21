package com.example.webshopbackend2.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class OrderLineDTO {
    @JsonAlias({"custom_order_id"})
    public long orderId;
    @JsonAlias({"product_id"})
    public long productId;
    public int amount;
    public double subtotal;

    public OrderLineDTO() {
    }
}
