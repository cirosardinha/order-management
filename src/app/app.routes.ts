import { Routes } from '@angular/router';
import { ordersRoutes } from './features/orders/orders.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  ...ordersRoutes,
];
