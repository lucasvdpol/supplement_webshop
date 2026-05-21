import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-searchbar',
  imports: [
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit {
  searchQuery: string = '';
  private productService = inject(ProductService);
  private filteredProducts = signal<Product[]>([]);

  ngOnInit() {
    this.filteredProducts = this.productService.getShownProducts();
  }

  onSearch() {
    this.productService.filterProductsBySearch(this.searchQuery.toLowerCase());
  }
}
