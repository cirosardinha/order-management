import { Component, output } from '@angular/core';
import { OrderStatus } from '../../enums/order-status';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dropdown',
  imports: [OverlayModule],
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
