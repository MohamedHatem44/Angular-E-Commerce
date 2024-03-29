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

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }

  updateOrder(orderId: string, updatedOrderData: any): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.patch<any>(url, updatedOrderData);
  }

  cancelOrder(orderId: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete<any>(url);
  }  

}
