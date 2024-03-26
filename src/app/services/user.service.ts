import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8000/api/v1/users';
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private httpClient: HttpClient, private router: Router) {}
  /*-----------------------------------------------------------------*/
  // Get list of Users
  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
  /*-----------------------------------------------------------------*/
  // Get specific User by id
  getUserById(userId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${userId}`);
  }
  /*-----------------------------------------------------------------*/
  // Create User
  createUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, user);
  }
  /*-----------------------------------------------------------------*/
  // Update specific User
  updateUser(userId: number, user: any): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/${userId}`, user);
  }
  /*-----------------------------------------------------------------*/
  // Delete specific User
  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${userId}`);
  }
}
