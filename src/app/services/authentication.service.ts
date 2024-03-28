import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
/*-----------------------------------------------------------------*/
export class AuthenticationService {
  baseUrl = 'http://localhost:8000/api/v1/auth';
  /*-----------------------------------------------------------------*/
  constructor(private httpClient: HttpClient, private router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.decodeUserData();
    }
  }
  /*-----------------------------------------------------------------*/
  userData = new BehaviorSubject(null);
  /*-----------------------------------------------------------------*/
  decodeUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }
  /*-----------------------------------------------------------------*/
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['users/login']);
  }
  /*-----------------------------------------------------------------*/
  register(userData: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/signup`, userData);
  }
  /*-----------------------------------------------------------------*/
  login(userData: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, userData);
  }
  /*-----------------------------------------------------------------*/
  getToken() {
    return localStorage.getItem('userToken');
  }
  /*-----------------------------------------------------------------*/
  isLoggedIn() {
    return !!this.getToken();
  }
  /*-----------------------------------------------------------------*/
    getUserRole() {
      return localStorage.getItem('role');
    }
  /*-----------------------------------------------------------------*/
  getUserId() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(encodedToken);
    return decodedToken.userId;
  }
/*-----------------------------------------------------------------*/
}
