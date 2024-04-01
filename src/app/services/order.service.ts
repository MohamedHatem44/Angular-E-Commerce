import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/v1/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // createOrder(orderData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, orderData);
  // }

  createOrder(orderData: any) {
    const url = this.apiUrl;
    const modelOrderData = {
      user: orderData.userId,
      products: orderData.cartItems.map((item: { productId: any; quantity: any; }) => ({
        product: item.productId,
        quantity: item.quantity
      })),
      totalPrice: orderData.totalPrice,
      status: 'placed' 
    };

    return this.http.post(url, modelOrderData);
  }

  deleteOrder(orderId: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete<any>(url);
  }  

}
