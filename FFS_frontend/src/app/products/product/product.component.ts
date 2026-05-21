import {Component, inject, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductButtonComponent} from './product-button/product-button.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [
    ProductButtonComponent
  ],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Input({required: true}) hideButton!: boolean;
  @Input({ required: true }) isButtonDisabled!: boolean;
  private router = inject(Router);


  get imagePath(){
    return 'assets/productImages/' + this.product.url;
  }

  protected onSelectProduct(event: Event){
    event.stopPropagation();
    this.router.navigate(['products/'+this.product.id]);
  }

  protected onAddToCart(event: Event) {
    event.stopPropagation();
  }

}
