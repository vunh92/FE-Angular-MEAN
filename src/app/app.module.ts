import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule  } from "@angular/material/tabs";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import {MatDialogModule} from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { AsideComponent } from './aside/aside.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { PostComponent } from './post/post.component';
import { Page404Component } from './page404/page404.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { ShopComponent } from './shop/shop.component';
import { CartLikeListComponent } from './cart-like-list/cart-like-list.component';
import { TestscreenComponent } from './testscreen/testscreen.component';

// Gọi HttpClientModule
import { HttpClientModule } from '@angular/common/http';

// Gọi thư viện phân trang
import {NgxPaginationModule} from 'ngx-pagination';

// Gọi thư viện sử dụng form ngoài file html
import { FormsModule } from '@angular/forms';

// Gọi thư viện sử dụng form trong file ts
import { ReactiveFormsModule } from '@angular/forms';
import { InfouserComponent } from './infouser/infouser.component';
import { ChatComponent } from './chat/chat.component';

// Gọi socket io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3100', options: {} };

// Gọi store
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { CounterComponent } from './counter/counter.component';
// import { MovieComponent } from './movie/movie.component';
// import { MovieListComponent } from './movie-list/movie-list.component';

import { infoReducer } from './Store/Reducers/info.reducers';

// Gọi cartReducer ra sử dụng
import { cartReducer } from './Store/Reducers/cart.reducers';
import { likeReducer } from './Store/Reducers/like.reducers';
import { loginReducer } from './Store/Reducers/login.reducers';
import { countCartReducer } from './Store/Reducers/count_cart.reducers';
import { countLikeReducer } from './Store/Reducers/count_like.reducers';
import { AdNavComponent } from './ad-nav/ad-nav.component';
import { AdHomeComponent } from './ad-home/ad-home.component';
import { AdCategoryComponent } from './ad-category/ad-category.component';
import { AdProductComponent } from './ad-product/ad-product.component';
import { AdUserComponent } from './ad-user/ad-user.component';
import { AdProductAddComponent } from './ad-product-add/ad-product-add.component';
import { ShipComponent } from './ship/ship.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    AsideComponent,
    HomeComponent,
    FooterComponent,
    ProductComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    PostComponent,
    Page404Component,
    InfouserComponent,
    ChatComponent,
    CounterComponent,
    CartListComponent,
    ShopComponent,
    CartLikeListComponent,
    TestscreenComponent,
    AdNavComponent,
    AdHomeComponent,
    AdCategoryComponent,
    AdProductComponent,
    AdUserComponent,
    AdProductAddComponent,
    ShipComponent,
    //MovieComponent,
    //MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot({ count: counterReducer, info: infoReducer, cart: cartReducer , like: likeReducer, login: loginReducer,
    count_cart: countCartReducer, count_like: countLikeReducer}),
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
