import { OrderStatus } from '../enums/order-stats';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerNotes: string;
  status: OrderStatus;
  deliveryDate: Date;
  orderPrice: number;
}
