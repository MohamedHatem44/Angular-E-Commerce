import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';
/*-----------------------------------------------------------------*/
@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
/*-----------------------------------------------------------------*/
export class AdminAddProductComponent implements OnInit {
  products: Product[] = [];
  imageDisplay!: string | ArrayBuffer;
  backendErrors: boolean = false;
  editMode: boolean = false;
  currentProductID?: string;
  /*-----------------------------------------------------------------*/
  // Ctor
  constructor(private _ProductService: ProductService, private _Router: Router, private _Route: ActivatedRoute, private dialog: MatDialog) {}
  /*-----------------------------------------------------------------*/
  ngOnInit(): void {
    // Get list of Products
    this._ProductService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
    /*-----------------------------------------------------------------*/
    this.checkEditMode();
  }
  /*-----------------------------------------------------------------*/
  // Product Form
  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]),
    quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    sold: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    priceAfterDiscount: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    image: new FormControl<File | null>(null, [Validators.required]),
    // category: new FormControl('', [Validators.required]),
    // brand: new FormControl('', [Validators.required]),
    ratingsAverage: new FormControl(''),
    ratingsQuantity: new FormControl('', [Validators.pattern('^[0-9]*$')]),
  });
  /*-----------------------------------------------------------------*/
  // Image Upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addProductForm.patchValue({ image: file });
      this.addProductForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }
  /*-----------------------------------------------------------------*/
  // Create Product Button (Edit or Add Product)
  createProductBtn() {
    if (this.addProductForm.invalid) {
      return;
    }

    const newProductFormData = new FormData();

    newProductFormData.append('title', this.addProductForm.controls['title'].value!);
    newProductFormData.append('description', this.addProductForm.controls['description'].value!);
    newProductFormData.append('quantity', this.addProductForm.controls['quantity'].value!);
    newProductFormData.append('sold', this.addProductForm.controls['sold'].value!);
    newProductFormData.append('price', this.addProductForm.controls['price'].value!);
    newProductFormData.append('priceAfterDiscount', this.addProductForm.controls['priceAfterDiscount'].value!);
    newProductFormData.append('ratingsAverage', this.addProductForm.controls['ratingsAverage'].value!);
    newProductFormData.append('ratingsQuantity', this.addProductForm.controls['ratingsQuantity'].value!);
    newProductFormData.append('image', this.addProductForm.controls['image'].value!);
    // newProductFormData.append('category', this.addProductForm.controls['category'].value!);
    // newProductFormData.append('brand', this.addProductForm.controls['brand'].value!);

    if (this.editMode) {
      this._updateProduct(this.currentProductID!, newProductFormData);
    } else {
      this._addProduct(newProductFormData);
    }
  }
  /*-----------------------------------------------------------------*/
  // Get specific Product by id
  private _addProduct(product: FormData) {
    this._ProductService.createProduct(product).subscribe(
      (response: any) => {
        this.openAlertDialog('Success', 'Product Created successfully.').then(() => {
          this.addProductForm.reset();
          this.imageDisplay = '';

          // Navigate to Products dashboard after a delay
          timer(1000).subscribe(() => {
            this.navigateToProductsDashboard();
          });
        });
      },
      (error: any) => {
        this.openAlertDialog('Error', 'An error occurred while creating the Product. Please try again.');
        this.backendErrors = true;
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Update specific Brand
  private _updateProduct(productID: string, product: FormData) {
    this._ProductService.updateProduct(productID, product).subscribe(
      (response: any) => {
        this.openAlertDialog('Success', 'Product updated successfully.').then(() => {
          this.addProductForm.reset();
          this.imageDisplay = '';

          // Navigate to Products dashboard after a delay
          timer(1000).subscribe(() => {
            this.navigateToProductsDashboard();
          });
        });
      },
      (error: any) => {
        this.openAlertDialog('Error', 'An error occurred while updating the Product. Please try again.');
        this.backendErrors = true;
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Alert Dialog
  openAlertDialog(title: string, message: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '550px',
        data: { title: title, message: message },
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
        resolve();
      });
    });
  }
  /*-----------------------------------------------------------------*/
  // Navigate To Products Dashboard After Add or Edit
  navigateToProductsDashboard() {
    this._Router.navigate(['/adminPanel/productsDashboard']);
  }
  /*-----------------------------------------------------------------*/
  // Check Edit Mode for Products Dashboard (Edit or Add Product)
  private checkEditMode() {
    this._Route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductID = params['id'];
        this._getProductById(params['id']);
      }
    });
  }
  /*-----------------------------------------------------------------*/
  // Get specific Product by id
  private _getProductById(id: string) {
    this._ProductService.getProductById(id).subscribe(
      (product: any) => {
        this.loadProductData(product);
      },
      (error: any) => {
        console.error('Error fetching Product by ID:', error);
      }
    );
  }
  /*-----------------------------------------------------------------*/
  // Load Data Into Form When Loading Edit Form
  private loadProductData(product: any) {
    const productData = product.data;

    this.addProductForm.controls['title'].setValue(productData.title);
    this.addProductForm.controls['description'].setValue(productData.description);
    this.addProductForm.controls['quantity'].setValue(productData.quantity);
    this.addProductForm.controls['sold'].setValue(productData.sold);
    this.addProductForm.controls['price'].setValue(productData.price);
    this.addProductForm.controls['priceAfterDiscount'].setValue(productData.priceAfterDiscount);
    this.addProductForm.controls['ratingsAverage'].setValue(productData.ratingsAverage);
    this.addProductForm.controls['ratingsQuantity'].setValue(productData.ratingsQuantity);
    // this.addProductForm.controls['category'].setValue(productData.category);
    // this.addProductForm.controls['brand'].setValue(productData.brand);

    // Display the image
    const image = new Image();
    image.onload = () => {
      this.imageDisplay = product.data.image;
    };
    image.src = product.data.image;
  }
  /*-----------------------------------------------------------------*/
  // Reset All Form
  resetAll() {
    this.addProductForm.reset();
    this.imageDisplay = '';
    this.backendErrors = false;
  }
  /*-----------------------------------------------------------------*/
}
