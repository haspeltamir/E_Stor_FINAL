import { Injectable } from '@angular/core';
import { shoppingCart } from '../models/shoppingCart';
import { BehaviorSubject, Observable } from 'rxjs';
import { devices } from '../models/devices';
import { shoppingCartItem } from '../models/shoppingCartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cart: shoppingCart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<shoppingCart> = new BehaviorSubject(
    this.cart
  );

  constructor() {}

  addToCart(device: devices): void {
    let cartItem = this.cart.items.find((item) => item.device.id === device.id);
    if (cartItem) return;

    this.cart.items.push(new shoppingCartItem(device));
    this.setCartToLocalStorage();
  }

  removeFromCart(deviceId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.device.id != deviceId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(deviceId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.device.id === deviceId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.device.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new shoppingCart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<shoppingCart> {
    return this.cartSubject.asObservable();
  }

  getCart(): shoppingCart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): shoppingCart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new shoppingCart();
  }
}
