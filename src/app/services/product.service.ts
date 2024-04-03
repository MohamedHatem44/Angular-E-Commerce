import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  @Output() footer = new EventEmitter<any>();
  baseUrl = 'http://localhost:8000/api/v1/products';
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _HttpClient: HttpClient) {}
  /*-----------------------------------------------------------------*/
  // Get list of Products
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }
  /*-----------------------------------------------------------------*/
  // Get specific Product by id
  getProductById(productId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/${productId}`);
  }
  /*-----------------------------------------------------------------*/
  // Create Product
  createProduct(product: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl, product);
  }
  /*-----------------------------------------------------------------*/
  // Update specific Product
  updateProduct(productId: number, product: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/${productId}`, product);
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Product
  deleteProduct(productId: number): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${productId}`);
  }
}
