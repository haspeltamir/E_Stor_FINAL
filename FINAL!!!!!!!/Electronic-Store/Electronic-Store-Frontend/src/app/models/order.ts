import { shoppingCartItem } from './shoppingCartItem';

export class Order {
  id!: number;
  items!: shoppingCartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
