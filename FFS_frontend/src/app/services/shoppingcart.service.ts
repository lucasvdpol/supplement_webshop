import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private shoppingCartItemsSignal = signal<Product[]>(this.getShoppingCartItemsFromLocalStorage());

  getShoppingCartItemsSignal() {
    return this.shoppingCartItemsSignal;
  }

  addShoppingCartItem(product: Product, amount: number) {
    const items = [...this.shoppingCartItemsSignal()];
    const existingProduct = items.find((p: Product) => p.id === product.id);

    if (existingProduct) {
      existingProduct.amount += amount;
    } else {
      const newProduct = {...product, amount: amount};
      items.push(newProduct);
    }

    this.updateCart(items);
  }

  removeShoppingCartItem(product: Product) {
    let items = [...this.shoppingCartItemsSignal()];
    const existingProduct = items.find((p: Product) => p.id === product.id);
    if(product.amount > 1 && existingProduct){
      existingProduct.amount -= 1;
    }else{
      items = this.shoppingCartItemsSignal().filter(p => p.id !== product.id);
    }
    this.updateCart(items);
  }

  isProductInCart(productId: number): boolean {
    return this.shoppingCartItemsSignal().some(p => p.id === productId);
  }

  private updateCart(items: Product[]) {
    this.shoppingCartItemsSignal.set(items);
    this.saveShoppingCartToLocalStorage(items);
  }

  private saveShoppingCartToLocalStorage(items: Product[]) {
    localStorage.setItem('shoppingCart', JSON.stringify(items));
  }

  private getShoppingCartItemsFromLocalStorage(): Product[] {
    const storedCart = localStorage.getItem('shoppingCart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  public clearShoppingCart(){
    this.shoppingCartItemsSignal.set([])
    localStorage.removeItem('shoppingCart');
  }

  public destroyProduct(product: Product) {
    let items = this.shoppingCartItemsSignal().filter(p => p.id !== product.id);
    this.updateCart(items);
  }
}
