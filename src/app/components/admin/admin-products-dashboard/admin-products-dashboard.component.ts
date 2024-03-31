import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products-dashboard',
  templateUrl: './admin-products-dashboard.component.html',
  styleUrls: ['./admin-products-dashboard.component.css'],
})
export class AdminProductsDashboardComponent implements OnInit {
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

      this.products = this.products.filter((product: any) => product._id != idProduct);
      console.log(this.products);
    });
  }
}
