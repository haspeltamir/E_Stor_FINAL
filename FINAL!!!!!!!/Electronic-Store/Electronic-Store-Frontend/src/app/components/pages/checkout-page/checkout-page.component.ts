import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

const Cart_KEY = 'Cart';
@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(
    cartService: ShoppingCartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private router: Router,
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  get formControl() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.snackBar.open('Please fill the inputs', 'Invalid Inputs'
      ,{duration:3000});
      return;
    }

    this.order.name = this.formControl.name.value;
    this.order.address = this.formControl.address.value;
    console.log(this.order);
    this.orderService.create(this.order).subscribe({
      next:() => {
        localStorage.removeItem(Cart_KEY);
        this.router.navigateByUrl('/thanks');;
      },
      error:(errorResponse) => {
        this.snackBar.open(errorResponse.error, 'Error In Payment!');
      }
    })
    
  }

}
