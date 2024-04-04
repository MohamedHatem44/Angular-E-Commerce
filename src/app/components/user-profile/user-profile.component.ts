import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  isLoading: boolean = false;
  users: any[] = [];
  currentId: any = '';
  currentuser: any = {
    image: 'http://bootdey.com/img/Content/avatar/avatar1.png', // Default avatar URL
  };
  updatedProfile: any = {};
  editMode: boolean = false;
  token: string = localStorage.getItem('token') || ' ';
  isSaving: boolean = false; // Flag to indicate saving process

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getProfile();
    this.currentId = localStorage.getItem('currentid');
  }

  getProfile() {
    this.isLoading = true; // Set loading state to true
    this.currentId = localStorage.getItem('currentid');

    this.userService.getUserById(this.currentId).subscribe({
      next: (response: { data: any }) => {
        this.currentuser = response.data;
        console.log(this.currentuser);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching user profile:', err);
        this.isLoading = false;
      },
    });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.updatedProfile.image = file;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.currentuser.image = reader.result;
      };
    } else {
      this.currentuser.image = 'http://bootdey.com/img/Content/avatar/avatar1.png'; // Reset the photo if no file selected
    }
  }

  updateUserProfile() {
    this.isSaving = true; // Set saving state to true

    this.userService.updateUser(this.currentId, this.currentuser)
      .subscribe({
        next: (response) => {
          console.log('Profile updated on the server:', response);
          this.isSaving = false; // Set saving state to false
          //localStorage.setItem("user", JSON.stringify(this.currentuser)); // Update local storage
          this.updatedProfile = JSON.parse(JSON.stringify(this.currentuser)); //still not working :)))
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.isSaving = false; // Set saving state to false
        }
      });
  }

}
