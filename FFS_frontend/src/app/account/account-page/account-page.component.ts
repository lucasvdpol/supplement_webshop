import {Component, inject, signal} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {OrderService} from '../../services/order.service';
import {OrderCardComponent} from '../../order/order-card/order-card.component';
import {OrderProductComponent} from '../../order/order-product/order-product.component';
import {NavComponent} from '../../nav/nav.component';
import {OrderDetailComponent} from '../../order/order-detail/order-detail.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-account-page',
  imports: [
    OrderCardComponent,
    OrderProductComponent,
    NavComponent,
    OrderDetailComponent,
    TranslatePipe
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss'
})
export class AccountPageComponent {

  private loginSerivce = inject(LoginService);
  private orderService = inject(OrderService);
  protected orders = this.orderService.getOrders(this.loginSerivce.getEmail()!)


}
