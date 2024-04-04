import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm(): void {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  processPayment(event: Event): void {
    event.preventDefault();
        if (this.paymentForm.valid) {
      alert('Payment processed successfully!');
      this.router.navigate(['/Orders']);
    } else {
      alert('Please check the entered payment details.');
    }
  }
  
}