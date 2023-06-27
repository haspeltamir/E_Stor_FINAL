import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home-page/home.component';
import { DevicePageComponent } from './components/pages/device-page/device-page.component';
import { ShoppingCartPageComponent } from './components/pages/shopping-cart-page/shopping-cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { ThanksComponent } from './components/pages/thanks/thanks.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search/:searchName',
    component: HomeComponent,
  },
  {
    path: 'device/:id',
    component: DevicePageComponent,
  },
  {
    path: 'tag/:deviceTag',
    component: HomeComponent,
  },
  {
    path: 'shoppingCart',
    component: ShoppingCartPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'track/:orderId',
    component: OrderTrackPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'thanks',
    component: ThanksComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
