import { devices } from 'src/app/models/devices';
import { shoppingCartItem } from './shoppingCartItem';

export class shoppingCart{
    items:shoppingCartItem[]=[];
    totalPrice: number =0;
    totalCount: number =0;
}