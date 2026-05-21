import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Order} from '../models/order.model';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {forkJoin} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private loginService = inject(LoginService);

  protected orders = signal<Order[]>([]);
  private apiUrl = environment.apiUrl;


  public order(email: string, date: string, total: number, shoppingCartItems: Product[],
               firstname: string, lastname: string, address: string, postcode: string, city: string) {

    const subscription = this.httpClient.post<Order>(
      this.apiUrl + '/order',
      {
        email: email,
        date: date,
        total: total.toFixed(2),
        firstname: firstname,
        lastname: lastname,
        address: address,
        postcode: postcode,
        city: city
      }
    )
    subscription.subscribe({
      next: (responseData) => {
        this.createOrderLines(responseData.id, shoppingCartItems);
      }
    })
  }

  private createOrderLines(id: number, shoppingCartItems: Product[]) {
    const subscription = shoppingCartItems.map(product =>
      this.httpClient.post(this.apiUrl + '/orderline', {
        orderId: id,
        productId: product.id,
        amount: product.amount,
        subtotal: (product.price * product.amount).toFixed(2)
      }, { responseType: 'text' })
    );
    forkJoin(subscription).subscribe();
  }

  public getOrders(email: string) {
    let url = this.apiUrl + "/order/"+email;

    const subscription = this.httpClient.get<Order[]>(url).subscribe(
      {
        next: (responseData) => {
          let databaseOrders : Order[] = [];
          for (let order of responseData) {
            databaseOrders.push(order);
          }
          this.orders.set(databaseOrders);
        }
      }
    );
    this.destroyRef.onDestroy( () =>
      subscription.unsubscribe())
    return this.orders;
  }


}
