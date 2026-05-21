package com.example.webshopbackend2.dao;

import com.example.webshopbackend2.dto.ProductDTO;
import com.example.webshopbackend2.models.Category;
import com.example.webshopbackend2.models.Product;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Component
public class ProductDAO {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private CategoryDAO categoryDAO;

    public ProductDAO(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return this.productRepository.findByIsDeletedFalse();
    }

    public Product checkForProduct(Long id) {
        Optional<Product> optionalProduct = this.productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = (Product)optionalProduct.get();
            return product;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Id niet gevonden");
        }
    }

    public void updateProductById(Long id, ProductDTO productDTO){
        Product product = checkForProduct(id);
        product.setBrand(productDTO.brand);
        BigDecimal price = BigDecimal.valueOf(productDTO.price)
                .setScale(2, RoundingMode.HALF_UP);
        product.setPrice(price.doubleValue());
        product.setStock(productDTO.stock);
        product.setTaste(productDTO.taste);
        product.setUrl(productDTO.url);
        product.setIngredients(productDTO.ingredients);
        product.setAmountInGrams(productDTO.amountInGrams);
        product.setProteinPerPortion(productDTO.proteinPerPortion);
        Category category = this.categoryDAO.checkForCategoryByName(productDTO.categoryName);
        product.setCategory(category);
        this.productRepository.save(product);
    }

    public void deleteProductById(long id){
        Product product = this.checkForProduct(id);
        product.setDeleted(true);
        this.productRepository.save(product);

    }

    public void addNewProduct(ProductDTO productDTO){
        Category category = this.categoryRepository.findByName(productDTO.categoryName);
        double price = (double) Math.round(productDTO.price * 100) /100;
        Product newProduct = new Product(
                category, productDTO.taste, productDTO.brand, price, productDTO.url,
                productDTO.stock, false, productDTO.ingredients, productDTO.amountInGrams,
                productDTO.proteinPerPortion);

        List<Product> products = this.productRepository.findAll();

        if(products.contains(newProduct)){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Product bestaat al");
        }else{
            this.productRepository.save(newProduct);
        }
    }
}

