import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private _UserService: UserService) {}

  isLoading: boolean = false;
  users: any[] = [];
  currentId: any = '';
  currentuser: any;
  ngOnInit(): void {
    this.isLoading = true;
    this.currentId = localStorage.getItem('currentid');
    this._UserService.getUserById(this.currentId).subscribe({
      next: (response) => {
        this.currentuser = response.data;
        console.log(this.currentuser);
      },
    });
    this._UserService.getAllUsers().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.users = response.data;
        this.isLoading = false;
      },
    });
  }
}
