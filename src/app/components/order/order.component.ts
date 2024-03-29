import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loading = true;
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  updateOrder(orderId: string, updatedOrderData: any) {
    this.loading = true;
    this.orderService.updateOrder(orderId, updatedOrderData).subscribe({
      next: (response) => {
        // Update the local orders array with the modified order
        const updatedOrderIndex = this.orders.findIndex((order) => order.id === orderId);
        this.orders[updatedOrderIndex] = response.data;
  
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }
  

  cancelOrder(orderId: string) {
    this.loading = true;
    this.orderService.cancelOrder(orderId).subscribe({
      next: (response) => {
        // Remove the cancelled order from the local orders array
        this.orders = this.orders.filter((order) => order.id !== orderId);
  
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }
  
}
