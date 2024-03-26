import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css'],
})
export class ProductsDashboardComponent implements OnInit {
  products: any[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.products = response.data;
    });
  }
  deleteProduct(idProduct: any) {
    this.productService.deleteProduct(idProduct).subscribe((response) => {
      console.log(response);
      console.log(this.products);

      this.products = this.products.filter(
        (product: any) => product._id != idProduct
      );
      console.log(this.products);
    });
  }
}
