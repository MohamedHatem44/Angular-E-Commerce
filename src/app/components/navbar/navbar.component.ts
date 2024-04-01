import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  cartNumber: number = 0;
  currentId: any = '';
  isLoading: boolean = false;
  user: any;
  /*-----------------------------------------------------------------*/

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _UserService: UserService
  ) {}
  /*-----------------------------------------------------------------*/
  logOut() {
    this._AuthenticationService.logOut();
  }
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this.currentId = localStorage.getItem('currentid');
    this._UserService.getUserById(this.currentId).subscribe({
      next: (response) => {
        console.log(response.data);
        this.user = response.data;
      },
    });
    this._AuthenticationService.userData.subscribe({
      next: () => {
        console.log(this._AuthenticationService.userData.getValue());

        if (this._AuthenticationService.userData.getValue() !== null) {
          this.isLogin = true;
          if(this._AuthenticationService.getUserRole() =="admin" ){

            this.isAdmin = true;
            this.isUser = false;
          } else {
            this.isAdmin = false;
            this.isUser = true;
          }
        } else {
          this.isLogin = false;
          this.isAdmin = false;
          this.isUser = false;
        }
      },
    });
  }
}
