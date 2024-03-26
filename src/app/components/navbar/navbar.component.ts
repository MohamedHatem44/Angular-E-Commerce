import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isAdmin: boolean = false;
  cartNumber: number = 0;
  /*-----------------------------------------------------------------*/

  constructor(private _AuthenticationService: AuthenticationService) {}
  /*-----------------------------------------------------------------*/
  logOut() {
    this._AuthenticationService.logOut();
  }
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    this._AuthenticationService.userData.subscribe({
      next: () => {
        if (this._AuthenticationService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
}
