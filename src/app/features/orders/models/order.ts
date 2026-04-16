import { OrderStatus } from '../enums/order-status';

export interface Order {
  id: string;
  customerName: string;
  status: OrderStatus;
  deliveryDate: Date;
  product: string;
}
