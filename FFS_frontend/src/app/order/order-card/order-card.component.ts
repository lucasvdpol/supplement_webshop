import {Component, Input} from '@angular/core';
import {Order} from '../../models/order.model';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-order-card',
  imports: [
    TranslatePipe
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input({ required: true }) order!: Order;

}
