import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent {
  productId: any;
  constructor(
    private router: Router,
    private productService: ProductService,
    public activatedRoute: ActivatedRoute
  ) {
    this.productId = this.activatedRoute.snapshot.params['id'];
    console.log(this.productId);
  }
  errorinForm: boolean = false;
  get getTitle() {
    return this.productForm.controls['title'];
  }
  get getQuantity() {
    return this.productForm.controls['Quantity'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getImgScr() {
    return this.productForm.controls['imgScr'];
  }
  get getCategory() {
    return this.productForm.controls['category'];
  }
  get getBrand() {
    return this.productForm.controls['brand'];
  }
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    Quantity: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,20}$/),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,20}$/),
    ]),
    imgScr: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
  });
  addOrEditProduct(e: Event) {
    if (this.productForm.status == 'VALID') {
      console.log(this.productForm.value);
      if (this.productId) {
        this.productService
          .updateProduct(this.productId, this.productForm.value)
          .subscribe((Response) => {
            console.log(Response);
          });
      } else {
        this.productService
          .createProduct(this.productForm.value)
          .subscribe((Response) => {
            console.log(Response);
          });
      }
      this.router.navigate(['/productsDashboard']);

      this.errorinForm = false;
    } else {
      e.preventDefault();
      this.errorinForm = true;
    }
  }
}
