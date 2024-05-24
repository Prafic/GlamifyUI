import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';

import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/website/cart/cart.component';
import { CategoryProductComponent } from './components/website/category-product/category-product.component';
import { HomeComponent } from './components/website/home/home.component';
import { OrderItemsComponent } from './components/website/order-items/order-items.component';
import { ProductDetailsComponent } from './components/website/product-details/product-details.component';
import { ProductsComponent } from './components/website/products/products.component';
import { SearchProductComponent } from './components/website/search-product/search-product.component';
import { AdminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
 
  {path:'',component:HomeComponent},


  {path:'product',component:ProductsComponent},
  {path:'productDetails/:productId',component:ProductDetailsComponent},
  {path:'search/products/:searchString',component:SearchProductComponent},
  {path:'category/products/:id',component:CategoryProductComponent},


  {path:'admin/products',component:AdminProductsComponent,canActivate:[AdminGuard]},
  {path:'admin/category',component:AdminCategoryComponent,canActivate:[AdminGuard]},
  {path:'admin/customers',component:AdminCustomersComponent,canActivate:[AdminGuard]},
  
  {path:'cart',component:CartComponent,canActivate:[authGuard]},
  {path:'order_items',component:OrderItemsComponent,canActivate:[authGuard]},
  {path:'**',component:PageNotFoundComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
