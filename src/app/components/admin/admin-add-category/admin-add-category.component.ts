import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css'],
})
export class AdminAddCategoryComponent implements OnInit {
  categories: Category[] = [];
  backendErrors: boolean = false;
  // newCategory: any = { name: '', image: null };

  // addCategoryForm: FormGroup;
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _CategoryService: CategoryService) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    // Get list of Categories
    this._CategoryService.getAllcategories().subscribe(
      (response: any) => {
        this.categories = response.data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  addCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]*$')]),
    image: new FormControl('', [Validators.required]),
  });
  /*-----------------------------------------------------------------*/
  // Create Category
  // createCategory(): void {
  //   this._CategoryService.createCategory(this.newCategory).subscribe(
  //     (response: any) => {
  //       this.categories.push(response.data);
  //       this.newCategory = { name: '', image: null };
  //     },
  //     (error: any) => {
  //       console.error('Error creating category:', error);
  //     }
  //   );
  // }
  /*-----------------------------------------------------------------*/
  createCategoryBtn() {
    if (this.addCategoryForm.invalid) {
      return;
    }

    const newCategory: any = {
      name: this.addCategoryForm.controls['name'].value,
      image: this.addCategoryForm.controls['image'].value,
    };

    this._CategoryService.createCategory(newCategory).subscribe(
      (response: any) => {
        alert('Category created successfully.');
        this.addCategoryForm.reset();
      },
      (error: any) => {
        alert('An error occurred while creating the category. Please try again.');
        this.backendErrors = true;
      }
    );
  }
}
/*-----------------------------------------------------------------*/
