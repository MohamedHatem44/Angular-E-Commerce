// import { Component, OnInit } from '@angular/core';
// import { StripeService } from '../../services/payment.service';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {
//   paymentDetails: any = {
//     // Define properties for payment details (e.g., card number, expiry date, etc.)
//   };

//   constructor(private paymentService: StripeService) { }

//   ngOnInit(): void {
//     // Initialization logic
//   }

//   submitPayment(): void {
//     this.paymentService.processPayment(this.paymentDetails).subscribe(
//       (response) => {
//         // Handle successful payment
//       },
//       (error) => {
//         console.error('Error processing payment:', error);
//       }
//     );
//   }

// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private stripeService: StripeService) {}

  async ngOnInit() {
    const stripe = await this.stripeService.getStripe();
    // Use Stripe methods here, such as creating a checkout session
    const session = await this.createCheckoutSession(stripe);
    console.log(session);
    // Redirect the user to the checkout page
    await stripe.redirectToCheckout({ sessionId: session.id });
  }

  async createCheckoutSession(stripe: any) {
    // Make an API call to your server to create a checkout session
    const response = await fetch('http://localhost:8000/api/v1/orders/checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Add any data required for creating the checkout session
      })
    });
    const data = await response.json();
    return data.session;
  }
}



