import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthGuardService } from './guards/auth-guard.guard';
import { AdminGuardService } from './guards/admin-guard.guard';

import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  {
    path: 'usersDashboard',
    component: UsersComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  }, //edited remove it
  {
    path: 'userprofile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'usersDashboard',
    component: UsersComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  }, //edited remove it
  { path: 'users/login', component: LoginComponent }, //login
  { path: 'users/register', component: RegisterComponent }, //register
  {
    path: 'addProduct',
    component: ProductsFormComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  { path: 'products/:id', component: ProductsFormComponent },
  {
    path: 'productsDashboard',
    component: ProductsDashboardComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  { path: 'productsDetails/:id', component: ProductsDetailsComponent },
  
  //Order
  { path: 'Orders', component: OrderComponent },
  { path: 'payment', component: PaymentComponent },
  // { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
