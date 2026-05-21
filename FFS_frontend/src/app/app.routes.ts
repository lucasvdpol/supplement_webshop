import {CanMatchFn, RedirectCommand, Router, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {OrderComponent} from './order/order.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminpanelComponent} from './adminpanel/adminpanel.component';
import {inject} from '@angular/core';
import {LoginService} from './services/login.service';
import {AccountPageComponent} from './account/account-page/account-page.component';
import {FinishedOrderComponent} from './order/finished-order/finished-order.component';
import {ProductDetailComponent} from './products/product/product-detail/product-detail.component';
import {ChangeProductComponent} from './adminpanel/change-product/change-product.component';
import {ChangeDetailComponent} from './adminpanel/change-product/change-detail/change-detail.component';
import {AddCategoryComponent} from './adminpanel/add-category/add-category.component';
import {DeleteProductComponent} from './adminpanel/delete-product/delete-product.component';
import {DeleteProductDetailComponent} from './adminpanel/delete-product/delete-product-detail/delete-product-detail.component';
// import {AddProductComponent} from './adminpanel/add-product/add-product.component';

const canAccessAccount: CanMatchFn = (route, segments) => {
  const router = inject(Router)
  const loginService = inject(LoginService)
  if(loginService.isLoggedIn()){
    return true;
  }
  return new RedirectCommand(router.parseUrl("/"))
}

const canAccessAdmin: CanMatchFn = (route, segments) => {
  const router = inject(Router)
  const loginService = inject(LoginService)
  if(loginService.isAdmin()){
    return true;
  }
  return new RedirectCommand(router.parseUrl("/"))
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'account/account-page',
    canMatch: [canAccessAccount],
    component: AccountPageComponent,
  },
  {
    path: 'adminpanel',
    canMatch: [canAccessAdmin],
    component: AdminpanelComponent,
  },
  {
    path: 'adminpanel/change-product',
    canMatch: [canAccessAdmin],
    component: ChangeProductComponent,
  },{
    path: 'order/finished-order',
    canMatch: [canAccessAccount],
    component: FinishedOrderComponent,
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent,
  },
  {
    path: 'adminpanel/change-product-detail/:productId',
    canMatch: [canAccessAdmin],
    component: ChangeDetailComponent
  },
  {
    path: "adminpanel/add-category",
    canMatch: [canAccessAdmin],
    component: AddCategoryComponent,
  },
  {
    path: "adminpanel/delete-product",
    canMatch: [canAccessAdmin],
    component: DeleteProductComponent,
  },
  {
    path: 'adminpanel/delete-product-detail/:productId',
    canMatch: [canAccessAdmin],
    component: DeleteProductDetailComponent,
  },
  // {
  //   path: 'adminpanel/add-product',
  //   canMatch: [canAccessAdmin],
  //   component: AddProductComponent,
  // }
];
