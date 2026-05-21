import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-detail',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-detail.component.html',
  styleUrl: './change-detail.component.scss'
})
export class ChangeDetailComponent implements OnInit {
  protected product!: Product;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  protected errorMessage = "";

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

  protected changeForm = new FormGroup({
      "taste": new FormControl("", [Validators.required]),
      "categoryName": new FormControl("", [Validators.required]),
      "brand": new FormControl("", [Validators.required]),
      "price": new FormControl("", [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
      "url": new FormControl("", [Validators.required]),
      "stock": new FormControl("", [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
    }
  );


  onChange() {
    console.log(this.product);
    // let user_email = this.registerForm.get('email')?.value;
    // let user_password = this.registerForm.get('password')?.value;
    // if (user_email != null && user_password != null) {
    //   const subscription = this.registerService.register(
    //     user_email,
    //     user_password
    //   )
    //   subscription.subscribe({
    //     next: (responseData) => {
    //       this.router.navigate(['products']);
    //     },
    //     error: (error) => {
    //       this.errorMessage = error.error.message;
    //     }
    //   })
    // }
  }
}
