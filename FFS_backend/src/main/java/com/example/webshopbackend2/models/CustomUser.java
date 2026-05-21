package com.example.webshopbackend2.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity(
        name = "custom_user"
)
public class CustomUser {
    @Id
    @GeneratedValue
    private long id;
    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String role;
    @OneToMany(
            mappedBy = "customUser"
    )
    @JsonManagedReference
    private List<CustomOrder> customOrders;

    public CustomUser(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public CustomUser() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

