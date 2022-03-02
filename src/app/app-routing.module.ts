import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Gọi các component
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import { LoginComponent } from './login/login.component';
import { InfouserComponent } from './infouser/infouser.component';
import { CounterComponent } from './counter/counter.component';
import { CartListComponent } from './cart-list/cart-list.component';

// Gọi guard
import { AppGuard } from './app.guard';
import { ShopComponent } from './shop/shop.component';
import { CartLikeListComponent } from './cart-like-list/cart-like-list.component';
import { TestscreenComponent } from './testscreen/testscreen.component';
import { AdHomeComponent } from './ad-home/ad-home.component';
import { AdCategoryComponent } from './ad-category/ad-category.component';
import { AdProductComponent } from './ad-product/ad-product.component';
import { AdUserComponent } from './ad-user/ad-user.component';
import { AdProductAddComponent } from './ad-product-add/ad-product-add.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'danh-muc/:id',
    component: CategoryComponent
  },
  {
    path: 'san-pham/:id',
    component: ProductComponent
  },
  {
    path: 'tin-tuc',
    component: PostComponent
  },
  {
    path: 'lien-he',
    component: ContactComponent
  },
  {
    path: 'dang-nhap',
    component: LoginComponent
  },
  {
    path: 'thong-tin-thanh-vien',
    component: InfouserComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'count',
    component: CounterComponent
  },
  {
    path: 'gio-hang',
    component: CartListComponent
  },
  {
    path: 'cart-like-list',
    component: CartLikeListComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'test',
    component: TestscreenComponent
  },
  {
    path: 'admin',
    component: AdHomeComponent
  },
  {
    path: 'admin/category',
    component: AdCategoryComponent
  },
  {
    path: 'admin/product',
    component: AdProductComponent
  },
  {
    path: 'admin/product/add',
    component: AdProductAddComponent
  },
  {
    path: 'admin/user',
    component: AdUserComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
