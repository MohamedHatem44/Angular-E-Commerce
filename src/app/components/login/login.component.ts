import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any;
  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) {
    // if (localStorage.getItem('userToken') !== null) {
    //   _Router.navigate(['/home']);
    // }
  }

  isLoading: boolean = false;
  apiError: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  });

  loginUser(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this._AuthenticationService.login(loginForm.value).subscribe({
        next: (response) => {
          if (response) {
            this.user = response.data;
            if (this.user.role === 'admin') {
              this.isLoading = false;
              localStorage.setItem('userToken', response.token);
              localStorage.setItem('role', this.user.role);
              this._AuthenticationService.decodeUserData();
              localStorage.setItem('currentid', this.user._id);
              this._Router.navigate(['/adminPanel']);
            } else {
              this.isLoading = false;
              localStorage.setItem('userToken', response.token);
              localStorage.setItem('role', this.user.role);
              localStorage.setItem('currentid', this.user._id);
              this._AuthenticationService.decodeUserData();
              this._Router.navigate(['/home']);
            }
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 401) {
            this.apiError = 'Incorrect email or password. Please try again.';
          } else {
            this.apiError = 'An error occurred while logging in. Please try again later.';
          }
        },
      });
    } else {
      this.apiError = 'Please fill in all the required fields.';
    }
  }
}
