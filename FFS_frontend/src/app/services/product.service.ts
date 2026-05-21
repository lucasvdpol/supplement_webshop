import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected products = signal<Product[]>([]);
  protected shownProducts = signal<Product[]>([]);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private apiUrl = environment.apiUrl;

  constructor() {
  }

  public filterProductsBySearch(searchQuery: string) {
    if (searchQuery.trim().length > 0) {
      const filteredProducts = this.shownProducts().filter(product =>
        product.taste.toLowerCase().includes(searchQuery) ||
        product.category.name.toLowerCase().includes(searchQuery)
      );
      this.shownProducts.set(filteredProducts);
    } else {
      this.shownProducts.set(this.products());
    }
  }

  public getProducts() {
    return this.products;
  }

  public getShownProducts() {
    return this.shownProducts;
  }

  public getDatabaseProducts() {
    let url = this.apiUrl + "/product";

    const subscription = this.httpClient.get<Product[]>(url).subscribe(
      {
        next: (responseData) => {
          let databaseProducts: Product[] = [];
          for (let product of responseData) {
            databaseProducts.push(product);
          }
          this.products.set(databaseProducts);
          this.shownProducts.set(databaseProducts);
        }
      }
    );
    this.destroyRef.onDestroy(() =>
      subscription.unsubscribe())
  }

  public getProductById(productId: number) {
    let url = this.apiUrl + "/product/" + productId;
    return this.httpClient.get<Product>(url)
  }

  public filterByCategory(categoryName: string) {
    if (categoryName == "All") {
      this.shownProducts.set(this.products())
    }else{
      const filteredProducts = this.products().filter(p => p.category.name === categoryName);
      this.shownProducts.set(filteredProducts);
    }
  }

  public updateProductById(productId: number, product: Product) {
    let url = this.apiUrl + "/product/changeproduct/" + productId;

    const subscription = this.httpClient.put(url, {
      categoryName: product.category.name,
      taste: product.taste,
      brand: product.brand,
      price: product.price,
      url: product.url,
      stock: product.stock,
      isDeleted: product.isDeleted
    }, {responseType: 'text'}).subscribe();
    this.destroyRef.onDestroy(() =>
      subscription.unsubscribe())

  }

  public deleteProductById(productId: number) {
    let url = this.apiUrl + "/product/deleteproduct/" + productId;
    const subscription = this.httpClient.put(url, productId, {responseType: 'text'}).subscribe();
    this.destroyRef.onDestroy(() =>
      subscription.unsubscribe())
  }

  public addNewProduct(product: Product) {
    let url = this.apiUrl + "/product/addproduct";
    const subscription = this.httpClient.post(url, {
      categoryName: product.category.name,
      taste: product.taste,
      brand: product.brand,
      price: product.price,
      url: product.url,
      stock: product.stock,
      isDeleted: product.isDeleted,
      ingredients: product.ingredients,
      amountInGrams: product.amountInGrams,
      proteinPerPortion: product.proteinPerPortion
    }, {responseType: 'text'}).subscribe();
    this.destroyRef.onDestroy(() =>
      subscription.unsubscribe())
  }
}

