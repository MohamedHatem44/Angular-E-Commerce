import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:8000/api/v1/categories';
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private httpClient: HttpClient) {}
  /*-----------------------------------------------------------------*/
  // Get list of Categories
  getAllcategories(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
  /*-----------------------------------------------------------------*/
  // Get specific Category by id
  getCategoryById(categoryId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${categoryId}`);
  }
  /*-----------------------------------------------------------------*/
  // Create Category
  createCategory(category: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, category);
  }
  /*-----------------------------------------------------------------*/
  // Update specific Category
  updateCategory(categoryId: number, category: any): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/${categoryId}`, category);
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Category
  deleteCategory(categoryId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${categoryId}`);
  }
}
