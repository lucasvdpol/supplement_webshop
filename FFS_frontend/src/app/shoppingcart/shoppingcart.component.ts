import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { ShoppingCartService } from '../services/shoppingcart.service';
import { Router } from '@angular/router';
import { ShoppingCartProductComponent } from '../products/shopping-cart-product/shopping-cart-product.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [ShoppingCartProductComponent, TranslatePipe],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent {
  @Output() removeItem = new EventEmitter();

  private shoppingCartService = inject(ShoppingCartService);
  private router = inject(Router);

  protected shoppingCartItems = this.shoppingCartService.getShoppingCartItemsSignal();

  protected totalPrice = computed(() =>
    this.shoppingCartItems().reduce((total, product) => total + (product.price * product.amount), 0)
  );

  public onOrder() {
    this.router.navigate(['order']);
  }

  isButtonDisabled(productId: number): boolean {
    return this.shoppingCartService.isProductInCart(productId);
  }

  getTotalItemCount(): number {
    return this.shoppingCartItems().reduce((total, product) => total + product.amount, 0);
  }
}
