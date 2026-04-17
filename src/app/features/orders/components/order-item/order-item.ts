import { Component, computed, input, output, signal } from '@angular/core';
import { Order } from '../../interfaces/order';
import { DatePipe } from '@angular/common';
import { OrderStatus } from '../../enums/order-status';
import { Dropdown } from '../dropdown/dropdown';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-order-item',
  imports: [DatePipe, Dropdown, OverlayModule],
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

  statusColor = computed(() => {
    const order = this.order();
    if (!order) return 'bg-gray-500';

    const map: Record<OrderStatus, string> = {
      'em andamento': 'bg-[#fdf1c6]',
      entregue: 'bg-[#cef9e4]',
      cancelado: 'bg-[#ffcdd2]',
    };

    return map[order.status] ?? 'bg-gray-500';
  });

  onToggleDropdown(event?: Event | void) {
    if (event instanceof Event) {
      event.stopPropagation();
    }

    this.toggleDropdown.emit();
  }

  onStatusSelected(status: OrderStatus) {
    this.onStatusChange(status);
  }
}
