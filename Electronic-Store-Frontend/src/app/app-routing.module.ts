import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DevicePageComponent } from './components/pages/device-page/device-page.component';
import { ShoppingCartPageComponent } from './components/pages/shopping-cart-page/shopping-cart-page.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
  path:'search/:searchName',component:HomeComponent
  },
  {
    path:'device/:id',component:DevicePageComponent
  },
  {
    path:'tag/:tag',component:HomeComponent
  },
  {
    path:'shoppingCart-page',component:ShoppingCartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
