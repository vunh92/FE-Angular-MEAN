import { Component, OnInit } from '@angular/core';

// Gọi ActivatedRoute, ParamMap
import { ActivatedRoute, ParamMap } from '@angular/router';

// Gọi Service
import { AppService } from '../app.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { incrementLike , decrementLike , resetLike  } from '../Store/Actions/count_like.action';
import { incrementCart , decrementCart , resetCart  } from '../Store/Actions/count_cart.action';

// Gọi actions và models
import { Cart } from '../Models/cart';
import { Like } from '../Models/like';

import { idUserGlobal } from '../app.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: AppService, private store: Store<{ cart: [], like: [] , login: boolean , 
    count_like: number, count_cart: number}>) { }

  slug:any;
  id_category:any;
  list_product:any;

  // phân trang
  pageSize = 3;
  p = 1;
  total:any;

  add_to_cart(id_product:any, name:any, price:any, qty:any, img:any){
    if(idUserGlobal == ''){
      alert('Yêu cầu bạn đăng nhập')
      return
    }
    var cart = new Cart(idUserGlobal,name,id_product,parseInt(price),parseInt(qty), img)
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
    var like = new Like(idUserGlobal, name,id_product, parseInt(price),img)
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

  ngOnInit(): void {
    this.router
    .paramMap
    .subscribe((params:ParamMap)=>{
      this.slug = params.get('id')

      this.service
      .get_id_category(this.slug)
      .subscribe((kq:any)=>{
        this.id_category = kq['data'];
        this.list_product = [];
        this.service
        .list_product_from_parent(this.id_category)
        .subscribe((kq2: any)=>{
          console.log(kq2)
          if(kq2['kq'] == 1) {
            this.list_product = kq2['data'];
            this.total = this.list_product.length;
          }
          else {this.total = 0}
        })
      })
    });
  }

}
