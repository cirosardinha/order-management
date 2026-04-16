import { effect, Injectable, signal } from '@angular/core';
import { Order } from '../models/order';
import { OrderStatus } from '../enums/order-status';

const STORAGE_KEY = 'orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly orders = signal<Order[]>([]);

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

  getOrderById(id: string): Order | undefined {
    return this.orders().find((order) => order.id === id);
  }

  addOrder(order: Partial<Order>): void {
    const newOrder = { ...order, id: this.generateId(), status: OrderStatus.IN_PROGRESS } as Order;
    this.orders.update((orders) => [...orders, newOrder]);
  }

  updateOrder(id: string, order: Partial<Order>): void {
    this.orders.update((orders) => orders.map((o) => (o.id === id ? { ...o, ...order } : o)));
  }

  deleteOrder(id: string): void {
    this.orders.update((orders) => orders.filter((o) => o.id !== id));
  }

  private generateId(): string {
    let id: string;

    do {
      const random = Math.floor(1000 + Math.random() * 9000);
      id = `ORD-${random}`;
    } while (this.orders().some((o) => o.id === id));

    return id;
  }
}
