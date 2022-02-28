import { Component, OnInit } from '@angular/core';

// Gọi service
import { AppService } from '../app.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { Info } from '../Models/info';
// import { addInfo, updateInfo, deleteInfo } from '../Store/Actions/info.action';
import { incrementLike , decrementLike , resetLike  } from '../Store/Actions/count_like.action';
import { incrementCart , decrementCart , resetCart  } from '../Store/Actions/count_cart.action';

// Gọi actions và models
import { Cart } from '../Models/cart';
import { Like } from '../Models/like';
// import { addCart } from '../Store/Actions/cart.action';
// import { addLike } from '../Store/Actions/like.action';

import { idUserGlobal } from '../app.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  // infos: Info[] = [];
  //info$: Observable<[]>;
  currentValue: Number = 0;

  cart$: Observable<[]>;
  like$: Observable<[]>;
  count_like: Observable<number>;
  count_cart: Observable<number>;
  id_user:any = ''
  isLogin: Observable<boolean>;

  constructor(private service: AppService, private store: Store<{ cart: [], like: [] , login: boolean , 
    count_like: number, count_cart: number}>) { 
     //this.info$ = store.select('info');
     this.cart$ = store.select('cart');
     this.like$ = store.select('like');
     this.isLogin = store.select('login');
     this.count_like = store.select('count_like')
     this.count_cart = store.select('count_cart')
  }

  get_cart(){
    return this.cart$.pipe(map((data:any) => data));
  }

  get_like() {
    return this.like$.pipe(map((data:any) => data));
  }

  array_product:any;
  // array = [];

  ngOnInit(): void {
    this.id_user = localStorage.getItem('key_id_user')

    this.service
    .list_product()
    .subscribe((kq:any)=>{
      this.array_product = kq['data'];
      // console.log(this.array_product);
    })

    // Lấy danh sách giỏ hàng
    this.get_cart()
    .subscribe((kq:any)=>{
      // console.log(kq)
    });

    // Lấy danh sách like
    this.get_like()
    .subscribe((kq:any)=>{
      // console.log(kq)
    });

  }

  add_to_cart(id_product:any, name:any, price:any, qty:any, img:any){
    if(idUserGlobal == ''){
      alert('Yêu cầu bạn đăng nhập')
      return
    }
    var cart = new Cart(this.id_user,name,id_product,parseInt(price),parseInt(qty), img)
    // this.store.dispatch(addCart(cart))
    this.service
    .post_cart_item(cart)
    .subscribe((kq:any) => {
      if(kq['kq'] == 1){
        this.store.dispatch(incrementCart())
      }else {
        alert(kq['err'])
        // console.log(kq['err'])
      }
    })
  }

  add_to_like(id_product:any, name:any, price:any, img:any){
    if(idUserGlobal == ''){
      alert('Yêu cầu bạn đăng nhập')
      return
    }
    var like = new Like(this.id_user, name,id_product, parseInt(price),img)
    this.service
    .post_like_item(like)
    .subscribe((kq:any) => {
      if(kq['kq'] == 1){
        this.store.dispatch(incrementLike())
      }else {
        alert(kq['err'])
        // console.log(kq['err'])
      }
    })
    // this.store.dispatch(addLike(new Like(this.id_user,name,id_product,parseInt(price),img)))
  }

}
