import {Component, Input} from '@angular/core';
import {Order} from '../../models/order.model';
import {Product} from '../../models/product.model';
import {OrderLine} from '../../models/orderline.model';

@Component({
  selector: 'app-order-product',
  imports: [],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.scss'
})
export class OrderProductComponent {
  @Input({ required: true }) orderline!: OrderLine;

  get imagePath(){
    return 'assets/productImages/' + this.orderline.product.url;
  }
}
