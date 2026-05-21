import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Product} from '../../models/product.model';
import {ShoppingCartService} from '../../services/shoppingcart.service';
import {ProductComponent} from '../product/product.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart-product',
  imports: [],
  templateUrl: './shopping-cart-product.component.html',
  styleUrl: './shopping-cart-product.component.scss'
})
export class ShoppingCartProductComponent {
  @Input({ required: true }) product!: Product;
  @Output() removeItem = new EventEmitter<number>();
  private shoppingCartService = inject(ShoppingCartService);
  private router = inject(Router);

  get imagePath(){
    return 'assets/productImages/' + this.product.url;
  }

  protected onProductAdd(event: Event){
    event.stopPropagation();
    this.shoppingCartService.addShoppingCartItem(this.product, 1);
  }

  protected onProductRemove(event: Event) {
    event.stopPropagation();
    if (this.product.amount == 1) {
      this.removeItem.emit(this.product.id);
    }
    this.shoppingCartService.removeShoppingCartItem(this.product);

  }

  protected onProductDestroy(event: Event){
    event.stopPropagation();
    this.shoppingCartService.destroyProduct(this.product);
  }

  protected onSelectProduct(event: Event){
    event.stopPropagation();
    this.router.navigate(['products/'+this.product.id]);
  }


}
