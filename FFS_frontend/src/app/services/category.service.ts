import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories = signal<Category[]>([]);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  protected apiUrl = environment.apiUrl;

  constructor() {
    this.getDatabaseCategories();
  }


  public getCategories(){
    this.getDatabaseCategories();
    return this.categories;
  }


  private getDatabaseCategories(){
    let url = this.apiUrl + "/categories";

    const subscription = this.httpClient.get<Category[]>(url).subscribe(
      {
        next: (responseData) => {
          this.categories.set(responseData);
        }
      }
    );
    this.destroyRef.onDestroy( () =>
      subscription.unsubscribe())
  }

  public checkForCategory(CategoryName:string){
    return this.categories().some((category) => category.name === CategoryName);
  }

  public getCategoryByName(CategoryName:string){
    return this.categories().find((category) => category.name === CategoryName);
  }

  public addNewCategory(categoryName: string){
    let url = this.apiUrl + "/categories";

    const subscription = this.httpClient.post(url, {
      name: categoryName}, {responseType: 'text'}).subscribe();
    this.destroyRef.onDestroy( () =>
      subscription.unsubscribe())
  }

}
