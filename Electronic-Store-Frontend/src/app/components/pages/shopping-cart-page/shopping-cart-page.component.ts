import { SearchComponent } from '../../home/search/search.component';
import { Component } from '@angular/core';
import { shoppingCart } from 'src/app/models/shoppingCart';
import { shoppingCartItem } from 'src/app/models/shoppingCartItem';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css'],
})
export class ShoppingCartPageComponent {
  cart!: shoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(shoppingCartItem: shoppingCartItem) {
    this.shoppingCartService.removeFromCart(shoppingCartItem.device.id);
  }

  changeQuantity(shoppingCartItem: shoppingCartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.shoppingCartService.changeQuantity(
      shoppingCartItem.device.id,
      quantity
    );
  }
}
