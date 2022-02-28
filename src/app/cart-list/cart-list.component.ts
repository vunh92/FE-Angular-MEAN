import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Gọi actions và models
import { Cart } from '../Models/cart';
import { addCart, updateCart, deleteCart } from '../Store/Actions/cart.action';
import { incrementCart , decrementCart , resetCart  } from '../Store/Actions/count_cart.action';

// Gọi Service
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  currentValue: Number = 0;
  cart$: Observable<[]>;
  id_user:any = ''
  isEdit:any = false

  constructor(private store: Store<{ cart: [] }>, private service: AppService) {
    // this.cart$ = store.select('cart');
  }

  // get_cart(){
  //   return this.cart$.pipe(map((data:any) => data));
  // }

  // array=[{
  //   id_product: 0,
  //   name: '',
  //   price: 0,
  //   qty: 0
  // }];

  array:any

  // update={ id_product: '', name: '', qty: 0, price: 0 }
  update:any
  
  update_cart(item:any, qty:any){
    // console.log(new Cart(this.id_user, name.value, id_product, parseInt(price.value),parseInt(qty.value)))
    // this.store.dispatch(updateCart(new Cart(this.id_user, name.value, id_product.value, parseInt(price.value),parseInt(qty.value))))
    this.service
      .api_update_cart(item, qty.value)
      .subscribe((kq:any) => {
        if(kq['kq']==1){
          this.get_cart_list()
          this.isEdit = false
        }else{
          alert('Cập nhật thất bại!')
        }
        // console.log(kq)
      })
  }

  cancel_update_cart(){
    this.isEdit = false
  }

  edit_cart_item(item:any){
    this.update = item;
    this.isEdit = true
  }
  
  delete_cart_item(item:any){
    this.service
      .api_delete_cart(item)
      .subscribe((kq:any) => {
        if(kq['kq']==1){
          // this.get_cart_list()
          var index = this.array.indexOf(item);
          if (index !== -1) {
            this.array.splice(index, 1);
            this.store.dispatch(decrementCart())
            this.isEdit = false
          }
        }else{
          alert('Cập nhật thất bại!')
        }
        // console.log(kq)
      })
    // this.store.dispatch(deleteCart(id_product))
  }

  // addCart(id_product:any, name:any, qty:any, price:any){
  //   var cart = new Cart(this.id_user, name, id_product, parseInt(price),parseInt(qty))
  //   this.service
  //     .post_cart_item(cart)
  //     .subscribe((kq:any) => {
  //       console.log(kq)
  //     })
  // }

  get_cart_list(){
    this.service
      .get_cart_list(this.id_user)
      .subscribe((kq:any) => {
        this.array = kq['data']
        // console.log(kq['data'])
      })
  }
  
  ngOnInit(): void {
    this.id_user = localStorage.getItem('key_id_user')
    // this.get_cart()
    // .subscribe((kq:any)=>{
    //   this.array = kq;
    // });

    this.get_cart_list()
  }

}
