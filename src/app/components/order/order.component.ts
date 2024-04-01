import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private orderService: OrderService,
    private authService: AuthenticationService,
    public dialog: MatDialog) { }

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

  cancelOrder(orderId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this order?',
        proceed: () => {
          this.orderService.deleteOrder(orderId).subscribe({
            next: () => {
              this.orders = this.orders.filter((order) => order.id !== orderId);
              this.loading = false;
              this.fetchOrders(); // Refresh the orders list
            },
            error: (err) => {
              this.loading = false;
              // Display an error message to the user
              console.error(err);
            }
          });
        }
      }
    });
  }

  calculateOrderAge(orderDate: Date): number {
    const currentDate = new Date();
    const diffInMs = Math.abs(currentDate.getTime() - orderDate.getTime());
    // Convert milliseconds to days and round down to whole days
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  createOrder() {
    // Prepare order data (userId, cartItems, totalPrice)
    const orderData = {
      userId: this.authService.getUserId(),
      cartItems: this.cartItems,
      totalPrice: this.totalPrice,
    };

    this.orderService.createOrder(orderData)
      .subscribe({
        next: (response) => {
          console.log("Order created successfully:", response);
          // Clear cart (optional)
          this.cartItems = [];
        },
        error: (err) => {
          console.error("Error creating order:", err);
        }
      });
  }

}
