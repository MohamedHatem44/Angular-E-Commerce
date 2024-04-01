import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users-dashboard',
  templateUrl: './admin-users-dashboard.component.html',
  styleUrls: ['./admin-users-dashboard.component.css'],
})
export class AdminUsersDashboardComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.data;
      this.users = this.users.filter((user: any) => user.role != 'admin');
    });
  }
  deleteUser(idUser: any) {
    this.userService.deleteUser(idUser).subscribe((response) => {
      console.log(response);
      this.users = this.users.filter((user: any) => user._id != idUser);
    });
  }
}
