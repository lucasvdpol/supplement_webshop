package com.example.webshopbackend2.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class CustomOrder {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne(
            cascade = {CascadeType.MERGE}
    )
    @JsonBackReference
    private CustomUser customUser;
    @OneToMany(
            mappedBy = "customOrder",
            cascade = {CascadeType.ALL}
    )
    @JsonManagedReference
    private List<OrderLine> orderLines;
    private String email;
    private String orderDate;
    private String status;
    private double total;
    private String address;
    private String postcode;
    private String city;
    private String firstname;
    private String lastname;

    public CustomOrder(CustomUser customUser, String email, String orderDate, double total, String status,
                       String address, String postcode, String city, String firstname, String lastname) {
        this.customUser = customUser;
        this.email = email;
        this.orderDate = orderDate;
        this.total = total;
        this.status = status;
        this.address = address;
        this.postcode = postcode;
        this.city = city;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public CustomOrder(String email, String orderDate, double total, String status,
                       String address, String postcode, String city, String firstname, String lastname) {
        this.email = email;
        this.orderDate = orderDate;
        this.total = total;
        this.status = status;
        this.address = address;
        this.postcode = postcode;
        this.city = city;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public CustomOrder() {
    }

    public List<OrderLine> getOrderLines() {
        return this.orderLines;
    }

    public void setOrderLines(List<OrderLine> orderLines) {
        this.orderLines = orderLines;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public CustomUser getCustomUser() {
        return this.customUser;
    }

    public void setCustomUser(CustomUser customUser) {
        this.customUser = customUser;
    }

    public String getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getTotal() {
        return this.total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}

