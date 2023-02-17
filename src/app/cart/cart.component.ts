import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  items: any[] = [];

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.items = cartService.getItems();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const checkout = {
      userShip: this.checkoutForm.value,
      cart: this.cartService.items
    };
    this.items = this.cartService.clearCart();
    localStorage.setItem('checkout', JSON.stringify(checkout))

    this.checkoutForm.reset();
  }

  addToCart(product: Product)
  {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product)
  {
    this.items = this.cartService.removeFromCart(product);
  }
}
