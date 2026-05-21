import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ProductComponent} from '../../../products/product/product.component';
import {ShoppingCartService} from '../../../services/shoppingcart.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-delete-product-detail',
  imports: [
    ReactiveFormsModule,
    ProductComponent,
    TranslatePipe
  ],
  templateUrl: './delete-product-detail.component.html',
  styleUrl: './delete-product-detail.component.scss'
})
export class DeleteProductDetailComponent implements OnInit {
  protected product!: Product;
  confirmCheckbox = new FormControl(false);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  protected message = "";
  private shoppingCartService = inject(ShoppingCartService);

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('productId')!);
    const subscription = this.productService.getProductById(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
      }
    });
    this.destroyRef.onDestroy(() =>
      subscription.unsubscribe())

  }

  onDeleteProduct() {
    if (this.confirmCheckbox.value) {
      this.productService.deleteProductById(this.product.id);
      this.shoppingCartService.destroyProduct(this.product);
      this.message = "Product is verwijderd!"
    }
  }
}
