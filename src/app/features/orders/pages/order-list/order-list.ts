import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Order } from '../../interfaces/order';
import { Header } from '../../components/header/header';
import { OrderItem } from '../../components/order-item/order-item';
import { OrderStatus } from '../../enums/order-status';

@Component({
  selector: 'app-order-list',
  imports: [Header, OrderItem],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit {
  private orderService = inject(OrderService);
  orders!: Signal<Order[]>;
  openDropdownId = signal<string | null>(null);

  ngOnInit(): void {
    this.orders = this.orderService.orders;
  }

  onOrderDeleted(orderId: string) {
    this.orderService.deleteOrder(orderId);
  }

  onStatusChange(event: { id: string; status: OrderStatus }) {
    this.orderService.updateOrder(event.id, { status: event.status });
  }

  toggleDropdown(orderId: string) {
    this.openDropdownId.update((currentId) => (currentId === orderId ? null : orderId));
  }
}
