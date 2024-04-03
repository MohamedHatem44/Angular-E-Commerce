import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient:HttpClient) {}

  /**Frist Method Add To Cart */
  getUserCartRequest(){
    return this.httpClient.get('http://localhost:8000/api/v1/carts');
  }
  /**Get product request */
  getProductRequest(){
    return this.httpClient.get('http://localhost:8000/api/v1/products');
  }

  /** service for updating cart */
  updateCart(_id:string,_token:string,_body:any){
    const headers= new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      token:_token
    });
    return this.httpClient.patch(`http://localhost:8000/api/v1/carts/${_id}`,_body)
  }

  /** service for Delete cart */
  deleteCart(_id:string,_token:string){
    const headers= new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      token:_token
    });
    return this.httpClient.delete(`http://localhost:8000/api/v1/carts/${_id}`)
  }
  /** service for Add cart */
  AddToCart(_token:string,_body:any){
    const headers= new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      token:_token
    });
    return this.httpClient.post(`http://localhost:8000/api/v1/carts`,_body)
  }
 /** service for Delete All user cart */
 deleteUserCart(_id:any){
  return this.httpClient.delete(`http://localhost:8000/api/v1/carts/${_id}/all`)
 }
 /** service for increase All user cart */
 products:any;
 cartLength = new BehaviorSubject(0);
  getUserCart(){
    this.getUserCartRequest().subscribe({
      next:async (data:any)=>{
      this.products=data;
      console.log(this.products);
      this.cartLength.next(await this.products.data.length);
              console.log(this.products);
        console.log(this.cartLength);

      },
      error:(error)=>console.log(error),
      complete:()=>console.log()
    });
  }
}
