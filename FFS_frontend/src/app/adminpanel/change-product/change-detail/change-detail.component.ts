import {Component, DestroyRef, inject, Input, OnInit, signal} from '@angular/core';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-change-detail',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './change-detail.component.html',
  styleUrl: './change-detail.component.scss'
})
export class ChangeDetailComponent implements OnInit {
  protected product!: Product;
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
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

  protected changeProductForm = new FormGroup({
      "taste": new FormControl("", [Validators.required]),
      "category": new FormControl("", [Validators.required]),
      "brand": new FormControl("", [Validators.required]),
      "price": new FormControl("", [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
      "url": new FormControl("", [Validators.required]),
      "stock": new FormControl("", [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
      "ingredients": new FormControl("", [Validators.required]),
      "amountInGrams": new FormControl("", [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
      "proteinPerPortion": new FormControl("", [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
    }
  );

  protected onChangeProduct() {
    let categoryName = this.changeProductForm.get("category")?.value;
    if(!this.changeProductForm.valid) {
      this.errorMessage = "Voer overal iets in. De prijs, voorraad en hoeveelheid moeten nummers zijn."
    }else if(!this.categoryService.checkForCategory(categoryName!)) {
      this.errorMessage = "Deze categorie bestaat niet."
    }else{
      let category = this.categoryService.getCategoryByName(categoryName!)!;
      let product: Product = {
        category: category,
        id: this.product.id,
        taste: this.changeProductForm.get('taste')!.value || this.product.taste,
        price: Number(this.changeProductForm.get('price')!.value) || this.product.price,
        brand: this.changeProductForm.get('brand')!.value || this.product.brand,
        url: this.changeProductForm.get('url')!.value || this.product.url,
        amount: 1,
        stock: Number(this.changeProductForm.get('stock')!.value) || this.product.stock,
        isDeleted: false,
        ingredients: this.changeProductForm.get("ingredients")!.value || this.product.ingredients,
        amountInGrams: Number(this.changeProductForm.get("amountInGrams")!.value) || this.product.amountInGrams,
        proteinPerPortion: Number(this.changeProductForm.get("proteinPerPortion")!.value) || this.product.proteinPerPortion,

      }
      this.productService.updateProductById(this.product.id, product)
      this.changeProductForm.reset()
      this.errorMessage = "Product aangepast!"
    }
  }
}
