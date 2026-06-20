package com.example.webshopbackend2.controller;

import com.example.webshopbackend2.dao.CategoryDAO;
import com.example.webshopbackend2.dto.CategoryDTO;
import com.example.webshopbackend2.models.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/categories"})
@CrossOrigin(origins = {"http://localhost:4200", "http://s1156206.student.inf-hsleiden.nl:16206", "https://webshop.lucasvandepol.com"})
public class CategoryController {
    private CategoryDAO categoryDAO;

    public CategoryController(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(this.categoryDAO.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<String> createCategory(@RequestBody CategoryDTO categoryDTO) {
        this.categoryDAO.createCategory(categoryDTO);
        return ResponseEntity.ok("New category was created");
    }
}
