import { Component, inject, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import {
  MatDatepicker,
  MatDatepickerToggle,
  MatDatepickerInput,
} from '@angular/material/datepicker';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { form, FormField, required } from '@angular/forms/signals';
import { OrderService } from '../../services/order-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

interface OrderFormData {
  customerName: string;
  deliveryDate: Date;
  product: string;
}

@Component({
  selector: 'app-order-form',
  imports: [
    Header,
    MatDatepicker,
    MatFormField,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatInput,
    MatLabel,
    MatHint,
    MatSuffix,
    MatButton,
    FormField,
    CommonModule,
  ],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderForm {
  private readonly orderService = inject(OrderService);
  private readonly toastr = inject(ToastrService);

  readonly orderFormModel = signal<OrderFormData>({
    customerName: '',
    deliveryDate: new Date(),
    product: '',
  });

  readonly orderForm = form(this.orderFormModel, (schemaPath) => {
    required(schemaPath.customerName);
    required(schemaPath.deliveryDate);
    required(schemaPath.product);
  });

  onSubmit(event: Event) {
    event.preventDefault();
    const formdata = {
      customerName: this.orderForm.customerName().value(),
      deliveryDate: this.orderForm.deliveryDate().value(),
      product: this.orderForm.product()?.value(),
    };
    this.orderService.addOrder(formdata);
    this.toastr.success('Pedido cadastrado!');
    this.orderFormModel.set({
      customerName: '',
      deliveryDate: new Date(),
      product: '',
    });
  }
}
