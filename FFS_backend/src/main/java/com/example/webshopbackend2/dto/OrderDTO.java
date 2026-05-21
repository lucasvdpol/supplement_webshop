package com.example.webshopbackend2.dto;

public class OrderDTO {
    public String date;
    public String email;
    public double total;
    public String address;
    public String postcode;
    public String city;
    public String firstname;
    public String lastname;

    public OrderDTO() {
    }

    public OrderDTO(String date, String email, double total, String address, String postcode, String city, String firstname, String lastname) {
        this.date = date;
        this.email = email;
        this.total = total;
        this.address = address;
        this.postcode = postcode;
        this.city = city;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
