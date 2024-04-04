// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthenticationService } from './authentication.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private apiUrl = 'http://localhost:8000/api/v1/orders';

//   constructor(private http: HttpClient, private authService: AuthenticationService) { }

//   getAllOrders(): Observable<any> {
//     const userId = this.authService.getUserId();
//     const authToken = this.authService.getToken();
    
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
//     return this.http.get(`${this.apiUrl}?userId=${userId}`, { headers });
//   }

//   // createOrder(orderData: any): Observable<any> {
//   //   return this.http.post<any>(this.apiUrl, orderData);
//   // }

//   createOrder(orderData: any) {
//     const url = this.apiUrl;
//     const modelOrderData = {
//       user: orderData.userId,
//       products: orderData.cartItems.map((item: { productId: any; quantity: any; }) => ({
//         product: item.productId,
//         quantity: item.quantity
//       })),
//       totalPrice: orderData.totalPrice,
//       status: 'placed' 
//     };

//     return this.http.post(url, modelOrderData);
//   }

//   deleteOrder(orderId: string): Observable<any> {
//     const url = `${this.apiUrl}/${orderId}`;
//     return this.http.delete<any>(url);
//   }  

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/v1/orders';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllOrders(): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    return this.http.get(`${this.apiUrl}`, { headers }).pipe(
      catchError(this.handleError)
    );
}


  getOrdersByUser(userId: string): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
  }

  createOrder(orderData: any): Observable<any> {
    const modelOrderData = {
      user: orderData.userId,
      products: orderData.cartItems.map((item: { productId: any; quantity: any; }) => ({
        product: item.productId,
        quantity: item.quantity
      })),
      totalPrice: orderData.totalPrice,
      status: 'placed' 
    };

    return this.http.post(this.apiUrl, modelOrderData).pipe(
      catchError(this.handleError)
    );
  }

  deleteOrder(orderId: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

