import { Component, inject, input } from '@angular/core';
import { Order } from '../../models/order';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../services/order-service';
import { OrderStatus } from '../../enums/order-status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-item',
  imports: [DatePipe],
  templateUrl: './order-item.html',
  styleUrl: './order-item.css',
})
export class OrderItem {
  order = input<Order>();
  orderService = inject(OrderService);
  statusSelectorOpen: boolean = false;
  router = inject(Router);

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

  onStatusChange(event: HTMLSelectElement) {
    const newStatus = Object.values(OrderStatus).find((status) => status === event.value);
    this.orderService.updateOrder(this.order()!.id, { status: newStatus });
    this.statusSelectorOpen = !this.statusSelectorOpen;
    event.value = '';
  }

  deleteOrder() {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      this.orderService.deleteOrder(this.order()!.id);
      this.statusSelectorOpen = false;
      this.router.navigate(['/orders']);
    }
  }

  openStatusSelector() {
    this.statusSelectorOpen = !this.statusSelectorOpen;
  }
}
