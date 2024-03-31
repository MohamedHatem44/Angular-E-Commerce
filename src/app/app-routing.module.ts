import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
import { AuthGuardService } from './guards/auth-guard.guard';
import { AdminGuardService } from './guards/admin-guard.guard';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsDashboardComponent } from './components/admin/admin-products-dashboard/admin-products-dashboard.component';
import { AdminCategoriesDashboardComponent } from './components/admin/admin-categories-dashboard/admin-categories-dashboard.component';
import { AdminBrandsDashboardComponent } from './components/admin/admin-brands-dashboard/admin-brands-dashboard.component';
import { AdminUsersDashboardComponent } from './components/admin/admin-users-dashboard/admin-users-dashboard.component';
import { AdminOrdersDashboardComponent } from './components/admin/admin-orders-dashboard/admin-orders-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'productsDashboard', component: ProductsDashboardComponent, canActivate: [AuthGuardService, AdminGuardService] },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'productsDashboard', component: AdminProductsDashboardComponent },
      { path: 'categoriesDashboard', component: AdminCategoriesDashboardComponent },
      { path: 'brandsDashboard', component: AdminBrandsDashboardComponent },
      { path: 'usersDashboard', component: AdminUsersDashboardComponent },
      { path: 'ordersDashboard', component: AdminOrdersDashboardComponent },
    ],
  },

  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'usersDashboard', component: UsersComponent, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'userprofile/:id', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'cart', component: CartComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'addProduct', component: ProductsFormComponent, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'products/:id', component: ProductsFormComponent },
  { path: 'productsDetails/:id', component: ProductsDetailsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
