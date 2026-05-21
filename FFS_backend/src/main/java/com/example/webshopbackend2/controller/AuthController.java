package com.example.webshopbackend2.controller;

import com.example.webshopbackend2.config.JWTUtil;
import com.example.webshopbackend2.dao.UserDAO;
import com.example.webshopbackend2.dao.UserRepository;
import com.example.webshopbackend2.dto.AuthenticationDTO;
import com.example.webshopbackend2.dto.LoginResponse;
import com.example.webshopbackend2.models.CustomUser;
import com.example.webshopbackend2.services.CredentialValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://s1156206.student.inf-hsleiden.nl:16206"})
@RequestMapping({"/auth"})
public class AuthController {
    private final UserRepository userRepository;
    private UserDAO userDAO;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;
    private CredentialValidator validator;

    public AuthController(UserDAO userDAO, UserRepository userRepository, JWTUtil jwtUtil, AuthenticationManager authManager, PasswordEncoder passwordEncoder, CredentialValidator validator) {
        this.userRepository = userRepository;
        this.userDAO = userDAO;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
    }

    @PostMapping({"/register"})
    public ResponseEntity<LoginResponse> register(@RequestBody AuthenticationDTO authenticationDTO) {
        if (!this.validator.isValidEmail(authenticationDTO.email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Geen geldige email");
        } else if (!this.validator.isValidPassword(authenticationDTO.password)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Geen geldig wachtwoord." +
                            "\n Het wachtwoord moet een lengte hebben van 8-30," +
                            "\nmet 1 grote letter, 1 kleine letter, 1 cijfer en" +
                            "\neen speciaal character. ");
        } else {
            CustomUser customUser = this.userRepository.findByEmail(authenticationDTO.email);
            if (customUser != null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Can not register with this email");
            } else {
                String encodedPassword = this.passwordEncoder.encode(authenticationDTO.password);
                CustomUser registerdCustomUser = new CustomUser(authenticationDTO.email, encodedPassword, "ROLE_USER");
                this.userRepository.save(registerdCustomUser);
                String token = this.jwtUtil.generateToken(registerdCustomUser.getEmail(), registerdCustomUser.getRole());
                LoginResponse loginResponse = new LoginResponse(registerdCustomUser.getEmail(), token, registerdCustomUser.getRole());
                return ResponseEntity.ok(loginResponse);
            }
        }
    }

    @PostMapping({"/login"})
    public ResponseEntity<LoginResponse> login(@RequestBody AuthenticationDTO body) {
        try {
            UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(body.email, body.password);
            this.authManager.authenticate(authInputToken);
            CustomUser customUser = this.userRepository.findByEmail(body.email);
            if (customUser == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
            }
            String token = this.jwtUtil.generateToken(body.email, customUser.getRole());
            LoginResponse loginResponse = new LoginResponse(customUser.getEmail(), token, customUser.getRole());
            return ResponseEntity.ok(loginResponse);
        } catch (AuthenticationException var6) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No valid credentials");
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<String> getRole(@PathVariable String email){
        return ResponseEntity.ok(this.userDAO.getRole(email));
    }
}
