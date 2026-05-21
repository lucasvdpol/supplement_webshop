import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Product} from '../../../models/product.model';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../../models/category.model';
import {CategoryService} from '../../../services/category.service';
import {ProductService} from '../../../services/product.service';
import {NavComponent} from '../../../nav/nav.component';
import {ShoppingCartService} from '../../../services/shoppingcart.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NavComponent,
    TranslatePipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  private shoppingCartService = inject(ShoppingCartService);
  protected isButtonDisabled = false;
  protected buttonValue: string = "Toevoegen";
  protected portions: number = 0;

  protected product! : Product;
  protected productAmount: number = 1;


  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('productId')!);
    const subscription = this.productService.getProductById(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.calculatePortions();

      }
    });
    this.destroyRef.onDestroy( () =>
      subscription.unsubscribe())

  }

  calculatePortions() {
    if(this.product) {
      if(this.product.category.name == "Pre-workout" || this.product.category.name == "Proteïne Poeder"){
        this.portions = Number((this.product.amountInGrams / 30).toFixed(0));
      }
      if(this.product.category.name == "Ashwagandha"){
        this.portions = Number((this.product.amountInGrams / 8).toFixed(0));
      }
      if(this.product.category.name == "Magnesium" || this.product.category.name == "Vitamines"){
        this.portions = Number((this.product.amountInGrams / 2).toFixed(0));
      }
      if(this.product.category.name == "Creatine"){
        this.portions = Number((this.product.amountInGrams / 3).toFixed(0));
      }
    }
  }

  get imagePath(){
    if(this.product){
      return 'assets/productImages/' + this.product.url;
    }
    return null;
  }

  protected onAddProduct(){
    this.productAmount += 1;
  }

  protected onRemoveProduct(){
    if(this.productAmount > 1){
      this.productAmount -= 1;
    }
  }

  protected onAddingShoppingCart(product: Product) {
    this.shoppingCartService.addShoppingCartItem(product, this.productAmount);
    this.isButtonDisabled = true;
    this.productAmount = 1;
    this.buttonValue = "Toegevoegd"

    setTimeout(()=>{
      this.isButtonDisabled = false;
      this.buttonValue = "Toevoegen"

    }, 2000)
  }

  protected calculatePrice(){
    return (this.product.price * this.productAmount).toFixed(2);
  }
}
