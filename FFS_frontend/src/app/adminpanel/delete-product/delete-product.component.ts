import {Component, inject, OnInit} from '@angular/core';
import {ChangeProductCardComponent} from '../../products/product/change-product-card/change-product.component';
import {ProductService} from '../../services/product.service';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-delete-product',
    imports: [
        ChangeProductCardComponent,
        TranslatePipe,
    ],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent implements OnInit {
  private productService = inject(ProductService);
  protected products = this.productService.getProducts();

  ngOnInit() {
    this.productService.getDatabaseProducts()
  }
}
