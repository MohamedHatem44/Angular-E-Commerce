import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SliderComponent } from './components/slider/slider.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsDashboardComponent } from './components/admin/admin-products-dashboard/admin-products-dashboard.component';
import { AdminCategoriesDashboardComponent } from './components/admin/admin-categories-dashboard/admin-categories-dashboard.component';
import { AdminBrandsDashboardComponent } from './components/admin/admin-brands-dashboard/admin-brands-dashboard.component';
import { AdminUsersDashboardComponent } from './components/admin/admin-users-dashboard/admin-users-dashboard.component';
import { AdminOrdersDashboardComponent } from './components/admin/admin-orders-dashboard/admin-orders-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    NotFoundComponent,
    FooterComponent,
    ProductsComponent,
    ProductsFormComponent,
    ProductsDashboardComponent,
    ProductsDetailsComponent,
    BrandsComponent,
    CategoriesComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    SliderComponent,
    UserProfileComponent,
    AdminSidebarComponent,
    AdminPanelComponent,
    AdminDashboardComponent,
    AdminProductsDashboardComponent,
    AdminCategoriesDashboardComponent,
    AdminBrandsDashboardComponent,
    AdminUsersDashboardComponent,
    AdminOrdersDashboardComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
