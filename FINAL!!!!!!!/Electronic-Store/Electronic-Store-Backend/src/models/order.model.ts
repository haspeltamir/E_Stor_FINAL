import { model, Schema, Types } from "mongoose";
import { OrderStatus } from "../../constants/order_status";
import { DevicesSchema, device } from "./device.model";



export interface OrderItem {
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  price: { type: Number },
  quantity: { type: Number },
});

export interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  paymentId: string;
  createdAt: string;
  status: string;
}


const orderSchema = new Schema<Order>(
  {
    id: { type: Number},
    items: { type: [OrderItemSchema] },
    totalPrice: { type: Number },
    name: { type: String },
    address: { type: String },
    paymentId: { type: String},
    createdAt: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model("order", orderSchema);
