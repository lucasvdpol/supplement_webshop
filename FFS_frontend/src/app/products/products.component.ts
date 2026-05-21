  import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
  import {ProductComponent} from './product/product.component';
  import {NavComponent} from '../nav/nav.component';
  import {ShoppingCartService} from '../services/shoppingcart.service';
  import {ProductService} from '../services/product.service';
  import {TranslatePipe} from '@ngx-translate/core';


  @Component({
    selector: 'app-products',
    imports: [
      ProductComponent,
      NavComponent,
      TranslatePipe,
    ],
    templateUrl: './products.component.html',
    standalone: true,
    styleUrl: './products.component.scss'
  })
  export class ProductsComponent implements OnInit {
    @Output() removeProduct = new EventEmitter();

    private productService = inject(ProductService);
    private shoppingCartService = inject(ShoppingCartService);

    protected shownProducts =  this.productService.getShownProducts();

    ngOnInit() {
      this.productService.getDatabaseProducts();
    }

    protected isButtonDisabled(productId: number): boolean {
      return this.shoppingCartService.isProductInCart(productId);
    }

    protected filterByCategory(categoryName: string) {
      this.productService.filterByCategory(categoryName);

    }


  }
