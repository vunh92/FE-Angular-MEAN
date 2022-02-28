import { Component, OnInit, Input } from '@angular/core';

import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Gọi Service
import { AppService } from '../app.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  url:any
  selected :any;

  @Input() _title:any;

  // cart$: Observable<[]>;
  // like$: Observable<[]>;
  count_like: Observable<number>;
  count_cart: Observable<number>;

  currentValue: Number = 0;
  likeCurrentValue: Number = 0;

  constructor(private store: Store<{ cart: [], like: [] , count_cart: number, count_like: number }>, private router: Router) {
    // this.cart$ = store.select('cart');
    // this.like$ = store.select('like');
    this.count_like = store.select('count_like')
    this.count_cart = store.select('count_cart')
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.url = event.url
      }
    });
  }

  select(item:any) {
    // this.selected = item; 
  };
  isActive(item:any) {
    return this.url === item;
  };

  isActiveGroup() {
    return this.url === '/tin-tuc' || this.url === '/thong-tin-thanh-vien' ;
  }

  // isLogin=false;

  // get_cart(){
  //   return this.cart$.pipe(map((data:any) => data));
  // }

  // get_like(){
  //   return this.like$.pipe(map((data:any) => data));
  // }
  
  search(t:any){
    alert(t.value);
  }
  
  ngOnInit(): void {
    // this.get_cart()
    // .subscribe((kq:any)=>{
    //   this.currentValue = kq.length;
    // });
    // this.get_like()
    // .subscribe((kq:any)=>{
    //   this.likeCurrentValue = kq.length;
    // });
  }
}
