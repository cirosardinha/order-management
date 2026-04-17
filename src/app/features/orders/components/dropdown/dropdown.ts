import { Component, output } from '@angular/core';
import { OrderStatus } from '../../enums/order-status';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  orderStatus = OrderStatus;
  statusSelected = output<OrderStatus>();
  closed = output<void>();

  onSelect(status: OrderStatus) {
    this.statusSelected.emit(status);
    this.closed.emit();
  }
}
