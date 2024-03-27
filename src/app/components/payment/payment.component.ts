import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentDetails: any = {
    // Define properties for payment details (e.g., card number, expiry date, etc.)
  };

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    // Initialization logic
  }

  submitPayment(): void {
    this.paymentService.processPayment(this.paymentDetails).subscribe(
      (response) => {
        // Handle successful payment
      },
      (error) => {
        console.error('Error processing payment:', error);
      }
    );
  }
}
