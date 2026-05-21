import {Component, inject, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ChangeProductCardComponent} from '../../products/product/change-product-card/change-product.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-change-product',
  imports: [
    ChangeProductCardComponent,
    TranslatePipe
  ],
  templateUrl: './change-product.component.html',
  styleUrl: './change-product.component.scss'
})
export class ChangeProductComponent implements OnInit {
  private productService = inject(ProductService);
  protected products = this.productService.getProducts();

  ngOnInit() {
    this.productService.getDatabaseProducts()
  }
}
