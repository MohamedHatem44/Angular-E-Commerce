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
  imageDisplay!: string | ArrayBuffer;
  backendErrors: boolean = false;
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
    // image: new FormControl('', [Validators.required]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });
  /*-----------------------------------------------------------------*/
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addCategoryForm.patchValue({ image: file });
      this.addCategoryForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }
  /*-----------------------------------------------------------------*/
  createCategoryBtn() {
    if (this.addCategoryForm.invalid) {
      return;
    }

    const newCategoryFormData = new FormData();
    newCategoryFormData.append('name', this.addCategoryForm.controls['name'].value!);
    newCategoryFormData.append('image', this.addCategoryForm.controls['image'].value!);

    this._CategoryService.createCategory(newCategoryFormData).subscribe(
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
