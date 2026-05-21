package com.example.webshopbackend2.dao;

import com.example.webshopbackend2.models.CustomUser;
import org.springframework.stereotype.Component;

@Component
public class UserDAO {

    private UserRepository userRepository;

    public UserDAO(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getRole(String email){
        CustomUser customUser = this.userRepository.findByEmail(email);
        return customUser.getRole();
    }
}
