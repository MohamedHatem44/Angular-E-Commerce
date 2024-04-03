import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-orders-dashboard',
  templateUrl: './admin-orders-dashboard.component.html',
  styleUrls: ['./admin-orders-dashboard.component.css']
})
export class AdminOrdersDashboardComponent {
  orders: any = [];
  selectedOrder: any;
  showModal = false;
  users: any[] = [];

  constructor(private orderService: OrderService, private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  viewOrderDetails(order: any) {
    this.selectedOrder = order; // Set the selected order
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (err) => {
        console.log("Error fetching orders: ", err);
      }
    })
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter((order: { _id: string; }) => order._id !== orderId);
      },
      error: (err) => {
        console.error("Error deleting order:", err);
        // Handle error
      }
    });
    this.fetchOrders();
  }

  changeOrderStatus(event: any, orderId: string) {
    const newStatus = event?.target?.value;
    if (newStatus) {
      const orderToUpdate = this.orders.find((order: { _id: string; }) => order._id === orderId);
      if (orderToUpdate) {
        orderToUpdate.status = newStatus;
      }
    }
  }
}
