import {Component, inject, Input} from '@angular/core';
import {Product} from '../../../models/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-product-card',
  imports: [],
  templateUrl: './change-product.component.html',
  styleUrl: './change-product.component.scss'
})
export class ChangeProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) deleted!: boolean;
  private router = inject(Router)


  get imagePath(){
    return 'assets/productImages/' + this.product.url;
  }

  protected onSelectProduct(){
    if(!this.deleted){
      this.router.navigate(['adminpanel/change-product-detail/'+this.product.id]);
    }else{
      this.router.navigate(['adminpanel/delete-product-detail/'+this.product.id]);
    }
  }

}
