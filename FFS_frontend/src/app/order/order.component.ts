  import {Component, computed, inject, OnInit, signal} from '@angular/core';
  import {ShoppingCartService} from '../services/shoppingcart.service';
  import {ShoppingCartProductComponent} from '../products/shopping-cart-product/shopping-cart-product.component';
  import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
  import {Router} from '@angular/router';
  import {OrderService} from '../services/order.service';
  import {LoginService} from '../services/login.service';
  import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  imports: [
    ShoppingCartProductComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent{
  private shoppingCartSerivce = inject(ShoppingCartService);
  private orderService = inject(OrderService);
  private loginService = inject(LoginService);
  protected userEmail = this.loginService.getEmail();
  protected shoppingCartItems = this.shoppingCartSerivce.getShoppingCartItemsSignal();
  protected totalPrice = computed(() =>
    this.shoppingCartItems().reduce((total, product) => total + (product.price * product.amount), 0)
  );
  private router = inject(Router);

  protected orderForm = new FormGroup({
    "email": new FormControl(this.userEmail || "", [Validators.required, Validators.email]),
    "firstname": new FormControl("", [Validators.required, Validators.min(2)]),
    "lastname": new FormControl("", [Validators.required, Validators.min(2)]),
    "address": new FormControl("", [Validators.required, Validators.min(5)]),
    "postcode": new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{4}\s?[A-Za-z]{2}$/)]),
    "city": new FormControl("", [Validators.required, Validators.min(2)]),
  })



  protected orderProducts(){
    let time: string = new Date().toISOString().split('T')[0];
    let email = this.orderForm.get('email')!.value;
    let firstname = this.orderForm.get("firstname")!.value;
    let lastname = this.orderForm.get("lastname")!.value;
    let address = this.orderForm.get("address")!.value;
    let postcode = this.orderForm.get("postcode")!.value;
    let city = this.orderForm.get("city")!.value;

    this.orderService.order(email!, time, this.totalPrice(), [...this.shoppingCartItems()],
                            firstname!, lastname!, address!, postcode!, city!);
    this.router.navigate(['order/finished-order']);
    this.shoppingCartSerivce.clearShoppingCart();
  }

  get email(){
    return this.orderForm.get('email');
  }

  get firstname(){
    return this.orderForm.get('firstname');
  }

  get lastname(){
    return this.orderForm.get('lastname');
  }

  get address(){
    return this.orderForm.get('address');
  }

  get postcode(){
    return this.orderForm.get('postcode');
  }

  get city(){
    return this.orderForm.get('city');
  }

}
