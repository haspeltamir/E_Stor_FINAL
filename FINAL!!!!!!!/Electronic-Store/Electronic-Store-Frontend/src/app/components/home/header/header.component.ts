import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;
  constructor(
    shoppingCartService: ShoppingCartService,
    private userService: UserService
  ) {
    shoppingCartService.getCartObservable().subscribe((newShoppingCart) => {
      this.cartQuantity = this.getTotalCountFromLocalStorage();
    });
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  logout() {
    this.userService.logOut();
  }

  get isAuth() {
    return this.user.token;
  }

  getTotalCountFromLocalStorage(): number {
    const cartData = localStorage.getItem('Cart');
    if (cartData) {
      const cart = JSON.parse(cartData);
      return cart.totalCount;
    } else {
      return 0;
    }
  }
}
