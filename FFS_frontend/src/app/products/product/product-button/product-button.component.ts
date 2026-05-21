import {Component, inject, Input} from '@angular/core';
import {Product} from '../../../models/product.model';
import {ShoppingCartService} from '../../../services/shoppingcart.service';
import {NgClass} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-product-button',
  imports: [
    NgClass,
    TranslatePipe
  ],
  templateUrl: './product-button.component.html',
  styleUrl: './product-button.component.scss'
})
export class ProductButtonComponent {
  protected isButtonDisabled: boolean = false;
  protected buttonValue: string = 'product.addToCart';
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) hideButton!: boolean;
  private shoppingCartService = inject(ShoppingCartService);


  onAddingShoppingCart(product: Product) {
    this.shoppingCartService.addShoppingCartItem(product, 1);
    this.isButtonDisabled = true;
    this.buttonValue = 'product.addedToCart';

    setTimeout(()=>{
      this.isButtonDisabled = false;
      this.buttonValue = 'product.addToCart';

    }, 2000)
  }


}
