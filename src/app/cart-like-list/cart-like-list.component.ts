import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Gọi Service
import { AppService } from '../app.service';

// Gọi actions và models
import { Like } from '../Models/like';
// import { updateLike, deleteLike } from '../Store/Actions/like.action';
import { incrementLike , decrementLike , resetLike  } from '../Store/Actions/count_like.action';

@Component({
  selector: 'app-cart-like-list',
  templateUrl: './cart-like-list.component.html',
  styleUrls: ['./cart-like-list.component.css']
})
export class CartLikeListComponent implements OnInit {

  // currentValue: Number = 0;
  // like$: Observable<[]>;
  id_user:any = ''

  constructor(private store: Store<{ like: [] , count_like: number}>, private service: AppService) {
    // this.like$ = store.select('like');
  }
  // get_like(){
  //   return this.like$.pipe(map((data:any) => data));
  // }

  array:any

  // array=[{
  //   id: '0',
  //   name: '',
  //   price: 0,
  //   img: ''
  // }];

  // update={ id: '0', name: '', img: 0, price: '' }

  get_like_list(){
    this.service
      .get_like_list(this.id_user)
      .subscribe((kq:any) => {
        this.array = kq['data']
        // console.log(kq['data'])
      })
  }

  delete_like_item(item:any){
    this.service
      .api_delete_like(item._id)
      .subscribe((kq:any) => {
        if(kq['kq']==1){
          // this.get_like_list()
          var index = this.array.indexOf(item);
          if (index !== -1) {
            this.array.splice(index, 1);
            this.store.dispatch(decrementLike())
          }
        }else{
          alert('Cập nhật thất bại!')
        }
        // console.log(kq)
      })
    // this.store.dispatch(deleteCart(id_product))
  }

  clickImageItem(item:any){
    // console.log(item)
    // this.service
    // .api_delete_like(item._id)
    // .subscribe((kq:any) => {
    //   if(kq['kq']==1){
    //     // this.get_like_list()
    //     var index = this.array.indexOf(item);
    //     if (index !== -1) {
    //       this.array.splice(index, 1);
    //       this.store.dispatch(decrementLike())
    //     }
    //   }else{
    //     alert('Cập nhật thất bại!')
    //   }
    // })
  }

  ngOnInit(): void {
    this.id_user = localStorage.getItem('key_id_user')

    // this.get_like()
    // .subscribe((kq:any)=>{
    //   this.array = kq;
    // });

    this.get_like_list()
  }

  // deleteLike(id:any){
  //   this.store.dispatch(deleteLike(id))
  // }

}
