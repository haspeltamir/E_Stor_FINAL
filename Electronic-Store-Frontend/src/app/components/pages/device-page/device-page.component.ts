import { DevicesService } from './../../../services/devices.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component } from '@angular/core';
import { devices } from 'src/app/models/devices';
import { shoppingCart } from 'src/app/models/shoppingCart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.css']
})
export class DevicePageComponent {
  device!:devices;
  constructor(activatedRoute:ActivatedRoute,devicesService:DevicesService
    ,private cartService:ShoppingCartService,private router:Router){
    activatedRoute.params.subscribe((params)=>{
      if(params.id)
        this.device=devicesService.getDevicesByID(params.id);
    })
  }

  addToCart(){
    this.cartService.addToCart(this.device);
    this.router.navigateByUrl('/shoppingCart-page');
  }
}
