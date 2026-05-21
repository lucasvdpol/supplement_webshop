import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-adminpanel',
  imports: [
    TranslatePipe
  ],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent {
  private router = inject(Router);

  onProductChange(){
    this.router.navigate(['adminpanel/change-product']);
  }

  onAddCategory(){
    this.router.navigate(['adminpanel/add-category']);
  }

  onDeleteProduct(){
    this.router.navigate(['adminpanel/delete-product']);
  }

  onAddProduct(){
    this.router.navigate(['adminpanel/add-product']);
  }
}
