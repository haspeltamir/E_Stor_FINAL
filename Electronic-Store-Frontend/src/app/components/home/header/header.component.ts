import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
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
      this.cartQuantity = newShoppingCart.totalCount;
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
}
