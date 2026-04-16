import { Component, input, output, signal } from '@angular/core';
import { Order } from '../../models/order';
import { DatePipe } from '@angular/common';
import { OrderStatus } from '../../enums/order-status';

@Component({
  selector: 'app-order-item',
  imports: [DatePipe],
  templateUrl: './order-item.html',
  styleUrl: './order-item.css',
})
export class OrderItem {
  order = input<Order>();
  statusSelectorOpen = signal(false);
  orderDeleted = output<string>();
  statusChanged = output<{ id: string; status: OrderStatus }>();

  onDelete(event: Event) {
    event.stopPropagation();
    const order = this.order();
    if (!order) return;

    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      this.orderDeleted.emit(order.id);
      this.statusSelectorOpen.set(false);
    }
  }

  onStatusChange(event: HTMLSelectElement) {
    const order = this.order();
    if (!order) return;

    const newStatus = event.value as OrderStatus;
    if (!newStatus) return;
    this.statusChanged.emit({ id: order.id, status: newStatus });
    this.statusSelectorOpen.set(false);
    event.value = '';
  }

  colorForStatus() {
    switch (this.order()?.status) {
      case 'em andamento':
        return 'bg-[#fdf1c6]';
      case 'entregue':
        return 'bg-[#cef9e4]';
      case 'cancelado':
        return 'bg-[#ffcdd2]';
      default:
        return 'bg-gray-500';
    }
  }

  openStatusSelector() {
    this.statusSelectorOpen.update((value) => !value);
  }
}
