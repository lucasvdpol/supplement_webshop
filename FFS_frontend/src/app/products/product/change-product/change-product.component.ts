import {Component, inject, Input} from '@angular/core';
import {Product} from '../../../models/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-product',
  imports: [],
  templateUrl: './change-product.component.html',
  styleUrl: './change-product.component.scss'
})
export class ChangeProductComponent {
  @Input({ required: true }) product!: Product;
  private router = inject(Router)


  get imagePath(){
    return 'assets/productImages/' + this.product.url;
  }

  protected onSelectProduct(){
    this.router.navigate(['adminpanel/change-product/'+this.product.id]);
  }

}
