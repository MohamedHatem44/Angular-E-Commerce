import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-categories-dashboard',
  templateUrl: './admin-categories-dashboard.component.html',
  styleUrls: ['./admin-categories-dashboard.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminCategoriesDashboardComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { name: '', image: '' };
  specificCatrgory: Category = {};
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
  // Create Category
  createCategory(): void {
    this._CategoryService.createCategory(this.newCategory).subscribe(
      (response: any) => {
        this.categories.push(response.data);
        this.newCategory = { name: '' };
      },
      (error: any) => {
        console.error('Error creating category:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Get specific Category by id
  getCategoryById(categoryId: string): void {
    this._CategoryService.getCategoryById(categoryId).subscribe(
      (response: any) => {
        console.log('Category:', response.data);
        this.specificCatrgory = response.data;
      },
      (error: any) => {
        console.error('Error fetching category by ID:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Update specific Category
  updateCategory(category: any): void {
    this._CategoryService.updateCategory(category._id, category).subscribe(
      () => {
        console.log('Category updated successfully');
      },
      (error: any) => {
        console.error('Error updating category:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Delete specific Category
  deleteCategory(categoryId: any): void {
    this._CategoryService.deleteCategory(categoryId).subscribe(
      () => {
        this.categories = this.categories.filter((category: Category) => category._id !== categoryId);
      },
      (error: any) => {
        console.error('Error deleting category:', error);
      }
    );
  }
}
/*-----------------------------------------------------------------*/
