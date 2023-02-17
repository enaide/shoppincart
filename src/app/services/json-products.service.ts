import { Product } from './../products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  concatMap,
  filter,
  from,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonProductsService {
  private categories$!: Observable<string[]>;
  private products$!: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.products$ = this.http
      .get<Product[]>('/assets/products.json')
      .pipe(map((result: any) => result['items']));

    this.categories$ = this.products$.pipe(
      map((products) =>
        products
          .map((p) => p.category ?? '(None)')
          .filter((c, index, array) => array.indexOf(c) == index)
          .sort()
      )
    );
  }

  getProducts(category?: string): Observable<Product[]> {
    return this.products$.pipe(
      map((products) =>
        products.filter(
          (p) => category === undefined || category === p.category
        )
      )
    );
  }

  getCategories(): Observable<string[]> {
    return this.categories$;
  }

  updateRatePrices(currency: any): Observable<Product[]> {
    const rate = this.http
      .get(`https://api.exchangerate-api.com/v4/latest/USD`)
      .pipe(switchMap((result: any) => of(result['rates'][currency])));

    const calculateTax = rate.pipe(
      concatMap((tax) =>
        this.products$.pipe(
          map((products) =>
            products.map((p: Product) => ({ ...p, price: tax * p.price }))
          )
        )
      )
    );
    return calculateTax;
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.products$.pipe(
      map((products) => products.find((p) => p.id === id))
    );
  }
}
