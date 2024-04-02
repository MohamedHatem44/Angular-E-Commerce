import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-categories-dashboard',
  templateUrl: './admin-categories-dashboard.component.html',
  styleUrls: ['./admin-categories-dashboard.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminCategoriesDashboardComponent implements OnInit {
  categories: Category[] = [];
  specificCatrgory: Category = {};
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _CategoryService: CategoryService, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    // Get list of Categories
    this._CategoryService.getAllcategories().subscribe(
      (response: any) => {
        console.log(response.data);
        this.categories = response.data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
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
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this category?',
        proceed: () => {
          this._CategoryService.deleteCategory(categoryId).subscribe({
            next: () => {
              this.categories = this.categories.filter((category: Category) => category._id !== categoryId);
            },
            error: (error) => {
              console.error('Error deleting category:', error);
            },
          });
        },
      },
    });
  }
}
/*-----------------------------------------------------------------*/
// Delete specific Category
// deleteCategory(categoryId: any): void {
//   this._CategoryService.deleteCategory(categoryId).subscribe(
//     () => {
//       this.categories = this.categories.filter((category: Category) => category._id !== categoryId);
//     },
//     (error: any) => {
//       console.error('Error deleting category:', error);
//     }
//   );
// }
/*-----------------------------------------------------------------*/
