import {OrderLine} from './orderline.model';

export interface Order {
  id: number;
  email: string,
  orderDate: string,
  total: number,
  orderLines?: OrderLine[],
  firstname: string,
  lastname: string,
  city: string,
  postcode: string,
  address: string,
}
