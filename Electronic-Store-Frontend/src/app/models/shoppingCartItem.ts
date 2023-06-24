import { devices } from 'src/app/models/devices';

export class shoppingCartItem{
    quantity:number = 1;
    price: number = this.device.price;

    constructor(public device:devices){

    }
}