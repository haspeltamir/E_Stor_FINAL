import { Injectable } from '@angular/core';
import { ORDER_CREATE_URL } from '../constants/url';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }
}
