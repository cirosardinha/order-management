import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/order-list/order-list').then((m) => m.OrderList),
      },
      {
        path: 'new',
        loadComponent: () => import('./pages/order-form/order-form').then((m) => m.OrderForm),
      },
    ],
  },
];
