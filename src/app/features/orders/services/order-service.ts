import { effect, Injectable, signal } from '@angular/core';
import { Order } from '../models/order';

const STORAGE_KEY = 'orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders = signal<Order[]>([]);

  constructor() {
    this.loadOrders();

    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders()));
    });
  }

  private loadOrders(): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        this.orders.set(JSON.parse(data));
      }
    } catch (error) {
      this.orders.set([]);
    }
  }

  getOrders(): Order[] {
    return this.orders();
  }

  getOrderById(id: string): Order | undefined {
    return this.orders().find((order) => order.id === id);
  }

  addOrder(order: Order): void {
    this.orders.update((orders) => [...orders, order]);
  }

  updateOrder(order: Order): void {
    this.orders.update((orders) => orders.map((o) => (o.id === order.id ? order : o)));
  }

  deleteOrder(id: string): void {
    this.orders.update((orders) => orders.filter((o) => o.id !== id));
  }
}
