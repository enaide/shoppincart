import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { CartService } from '../services/cart.service';
import { JsonProductsService } from '../services/json-products.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {

  @Input() allowCropImage = true;
  @Output() OnTaxChange = new EventEmitter();

  currentRate = 'USD';
  selectedRate = 1;
  constructor(
    private cartService: CartService,
    private jsonProductsService: JsonProductsService) {}

  ngOnInit(): void {}

  get itemCount() {
    return this.cartService.itemsCount();
  }

  get nunberCartItems() {
    return this.cartService.items.reduce((acc, item) => {}, 0);
  }

  changeRate(rate: any) {
    this.currentRate = rate
    const calculateTax = this.jsonProductsService.updateRatePrices(rate);
    this.OnTaxChange.emit({items: calculateTax, rate: this.currentRate});
  }
}
