import { Component, input, output, signal } from '@angular/core';
import { Order } from '../../models/order';
import { DatePipe } from '@angular/common';
import { OrderStatus } from '../../enums/order-status';
import { Dropdown } from '../dropdown/dropdown';

@Component({
  selector: 'app-order-item',
  imports: [DatePipe, Dropdown],
  templateUrl: './order-item.html',
  styleUrl: './order-item.css',
})
export class OrderItem {
  order = input<Order>();
  isOpen = input<boolean>(false);
  orderStatus = OrderStatus;
  orderDeleted = output<string>();
  statusChanged = output<{ id: string; status: OrderStatus }>();
  toggleDropdown = output<void>();
  openUpwards = signal<boolean>(false);

  onDelete(event: Event) {
    event.stopPropagation();
    const order = this.order();
    if (!order) return;

    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      this.orderDeleted.emit(order.id);
    }
  }

  onStatusChange(status: OrderStatus) {
    const order = this.order();
    if (!order) return;
    const newStatus = status;
    if (!newStatus) return;
    this.statusChanged.emit({ id: order.id, status: newStatus });
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

  onToggleDropdown() {
    this.toggleDropdown.emit();
  }

  onStatusSelected(status: OrderStatus) {
    this.onStatusChange(status);
  }
}
