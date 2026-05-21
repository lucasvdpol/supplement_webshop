import {Product} from './product.model';

export interface OrderLine{
  orderId: number;
  product: Product;
  amount: number;
  subtotal: number;
}
