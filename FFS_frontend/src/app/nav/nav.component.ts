import {Component, computed, EventEmitter, HostListener, inject, Input, Output, signal} from '@angular/core';
import {ShoppingcartComponent} from '../shoppingcart/shoppingcart.component';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {CategoryService} from '../services/category.service';
import {AccountComponent} from '../account/account.component';
import {Category} from '../models/category.model';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  imports: [
    ShoppingcartComponent,
    AccountComponent,
    SearchbarComponent,
    TranslatePipe
  ],
  templateUrl: './nav.component.html',
  standalone: true,
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  @Output() productChange = new EventEmitter<string>();
  @Input() allNav: boolean = true;
  @Input() shoppingCartPage: boolean = false;
  @Input() logOutText: boolean = false;
  @Input() searchbar: boolean = true;

  private categorieService = inject(CategoryService);
  private loginSerivce = inject(LoginService);
  private router = inject(Router);

  protected categories = this.categorieService.getCategories();
  protected hideAdminPanel = computed(() => this.loginSerivce.isAdmin());
  protected shoppingCart = false;
  isDropdownOpen = signal(false);

  protected onAdminPanel(){
    this.router.navigate(['adminpanel']);

  }

  protected onProductChange(categoryName: string){
    this.productChange.emit(categoryName);
  }

  protected logout(){
    this.loginSerivce.logout();
    this.router.navigate(['products']);

  }

  toggleDropdown() {
    if (window.innerWidth <= 720) {
      this.isDropdownOpen.update(open => !open);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (window.innerWidth <= 720 &&
      !(event.target as Element).closest('.categories-dropdown')) {
      this.isDropdownOpen.set(false);
    }
  }

}
