import {Component, Input} from '@angular/core';
import {Order} from '../../models/order.model';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-order-detail',
  imports: [
    TranslatePipe
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  @Input({ required: true }) order!: Order;

}
