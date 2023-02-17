import { Observable, filter, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products';
import { CartService } from '../services/cart.service';
import { JsonProductsService } from '../services/json-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // product: Product | undefined;
  product! : Observable<Product | undefined> ;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private jsonProductsService: JsonProductsService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.product = this.jsonProductsService.getProduct(productIdFromRoute)
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
