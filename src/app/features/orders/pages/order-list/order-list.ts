import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models/order';
import { Header } from '../../components/header/header';
import { OrderItem } from '../../components/order-item/order-item';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-order-list',
  imports: [Header, OrderItem, RouterLink, MatListModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit {
  private orderService = inject(OrderService);
  orders!: Signal<Order[]>;

  ngOnInit(): void {
    this.orders = this.orderService.orders;
  }
}
