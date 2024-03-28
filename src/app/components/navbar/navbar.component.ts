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
  isUser:boolean=false;
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
        console.log(this._AuthenticationService.userData.getValue());

        if (this._AuthenticationService.userData.getValue() !== null) {
          this.isLogin = true;
          if(this._AuthenticationService.getUserRole() =="admin" ){
            this.isAdmin = true;
            this.isUser=false;
           }else{
            this.isAdmin = false;
            this.isUser=true;
           }
        } else {
          this.isLogin = false;
          this.isAdmin = false;
          this.isUser=false;
        }

      },
    });
  }
}
