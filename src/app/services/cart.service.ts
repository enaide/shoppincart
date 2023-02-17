import { Product } from './../products';
import { Injectable } from '@angular/core';

type CartItem = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: any[] = [];
  totalAmount: number = 0;

  constructor() {}

  addToCart({ id, name, price, amount = 1 }: any) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      const existingCartItem = this.items[index];
      existingCartItem.amount++;
      this.items[index] = existingCartItem;
    } else {
      this.items.push({ id, name, price, amount });
    }
  }

  removeFromCart(product: Product) {
    const index = this.items.findIndex((item) => item.id === product.id);

    if(index !==-1){
      const existingCartItem = this.items[index];

      if(existingCartItem.amount === 1){
        this.items = this.items.filter((p: Product) => product.id !== p.id);
      }else{
        existingCartItem.amount--;
        this.items[index] = existingCartItem;
      }
    }
    return this.items
  }

  getItems() {
    return this.items;
  }

  itemsCount() {
    return this.items.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
