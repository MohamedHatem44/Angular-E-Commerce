import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  token = localStorage.getItem('userToken');
  constructor(private productsService: ProductService, private cartService: CartService) {}

  isSpin: boolean = false;
  products: any[] = [];

  isLoading: boolean = false;

  ngOnInit(): void {
    this.isSpin = true;
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.productsService.footer.emit();
        this.isSpin = false;
      },
    });
  }
  /*-----------------------------------------------------------------*/
  getUserRole(): string | null {
    // Retrieve user role from local storage
    return localStorage.getItem('role');
  }
  /*-----------------------------------------------------------------*/
  addToCart(productId: string) {
    this.isLoading = true;
    const body = {
      user: '660419c60e2e3c90aed9864f',
      product: productId,
      quantity: 1,
    };
    this.cartService.AddToCart(this.token!, body).subscribe({
      next: (response) => {
        console.log(response);
        // this.cartService.numberOFCartItems.next(response.numOfCartItems);
        this.isLoading = false;
        this.cartService.getUserCart();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
