import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { JsonProductsService } from '../services/json-products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;
  currency = "USD";

  selectedCategory: string | undefined;
  constructor(
    private cartService: CartService,
    private jsonProductsService: JsonProductsService
  ) {}

  ngOnInit(): void {
    this.products$ = this.jsonProductsService.getProducts(this.selectedCategory);
    this.categories$ = this.jsonProductsService.getCategories();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
    this.products$ = this.jsonProductsService.getProducts(this.selectedCategory);
  }

  updateRatePrices(obj: any){
    this.products$ = obj.items;
    this.currency = obj.rate
  }
}
