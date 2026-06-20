package com.example.webshopbackend2.controller;

import com.example.webshopbackend2.dao.ProductDAO;
import com.example.webshopbackend2.dto.ProductDTO;
import com.example.webshopbackend2.models.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/product"})
@CrossOrigin(origins = {"http://localhost:4200", "http://s1156206.student.inf-hsleiden.nl:16206", "https://webshop.lucasvandepol.com"})
public class ProductController {
    private ProductDAO productDAO;

    public ProductController(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(this.productDAO.getAllProducts());
    }

    @GetMapping({"/{productId}"})
    public ResponseEntity<Product> getProductById(@PathVariable long productId) {
        return ResponseEntity.ok(this.productDAO.checkForProduct(productId));
    }

    @PutMapping("/changeproduct/{id}")
    public ResponseEntity<String> updateProductById(@PathVariable long id, @RequestBody ProductDTO productDTO){
        this.productDAO.updateProductById(id, productDTO);
        return ResponseEntity.ok("Product aangepast met ID "+ id);
    }

    @PutMapping("/deleteproduct/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable long id){
        this.productDAO.deleteProductById(id);
        return ResponseEntity.ok("Product is verwijderd met ID " + id);
    }

    @PostMapping("/addproduct")
    public ResponseEntity<String> addNewProduct(@RequestBody ProductDTO productDTO){
        this.productDAO.addNewProduct(productDTO);
        return ResponseEntity.ok("Product toegevoegd");
    }
}

