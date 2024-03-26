import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  baseUrl = 'http://localhost:8000/api/v1/brands';
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private httpClient: HttpClient) {}
  /*-----------------------------------------------------------------*/
  // Get list of Brands
  getAllBrands(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
  /*-----------------------------------------------------------------*/
  // Get specific Brand by id
  getBrandById(brandId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${brandId}`);
  }
  /*-----------------------------------------------------------------*/
  // Create Brand
  createBrand(brand: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, brand);
  }
  /*-----------------------------------------------------------------*/
  // Update specific Brand
  updateBrand(brandId: number, brand: any): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/${brandId}`, brand);
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Brand
  deleteBrand(brandId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${brandId}`);
  }
}
