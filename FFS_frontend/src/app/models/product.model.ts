import {Category} from './category.model';

export interface Product{
  category: Category;
  id: number,
  taste: string,
  brand: string,
  price: number,
  url: string,
  amount: number,
  stock: number,
  isDeleted: boolean,
  ingredients: String,
  amountInGrams: number,
  proteinPerPortion: number,
}
