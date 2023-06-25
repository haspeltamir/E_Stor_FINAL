import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home-page/home.component';
import { DevicePageComponent } from './components/pages/device-page/device-page.component';
import { ShoppingCartPageComponent } from './components/pages/shopping-cart-page/shopping-cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
