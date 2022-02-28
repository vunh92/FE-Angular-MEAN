import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

// Gọi service
import { AppService } from '../app.service';

// Gọi ActivatedRoute, ParamMap
import { Router, Event as NavigationEvent } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Info } from '../Models/info';
import { addInfo, updateInfo, deleteInfo } from '../Store/Actions/info.action';

// Gọi actions và models
import { Cart } from '../Models/cart';
import { addCart } from '../Store/Actions/cart.action';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'ng-carousel-demo';
  
  images = [
    {title: 'First Slide', short: 'First Slide Short', src: "https://picsum.photos/id/700/900/500"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "https://picsum.photos/id/1011/900/500"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "https://picsum.photos/id/984/900/500"}
  ];

  infos: Info[] = [];
  //info$: Observable<[]>;
  currentValue: Number = 0;

  cart$: Observable<[]>;

  token:any

  cateList1:any
  cateList2:any
  cateList3:any

  constructor(private service: AppService, private store: Store<{ cart: [] }>, 
    private config: NgbCarouselConfig, private router: Router) {
    //this.info$ = store.select('info');
    this.cart$ = store.select('cart');
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false
  }

  callJquery(){
    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
  }

  clickGoLink(link:any){
    this.router.navigate([link])
    .then(() => {
      // window.location.reload()
      // this.login$ = this.login$.pipe(map((data:any) => data));
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    })
  }

  getCategoryList(){
    //get cate list 1
    this.service
    .get_id_category('dien-thoai-di-dong')
    .subscribe((kq:any)=>{
      var id_category = kq['data'];
      this.cateList1 = [];
      this.service
      .list_product_from_parent(id_category)
      .subscribe((kq2: any)=>{
        console.log(kq2)
        if(kq2['kq'] == 1) {
          this.cateList1 = kq2['data'];
          // this.total = this.cateList1.length;
        }
        // else {this.total = 0}
      })
    })

    //get cate list 2
    this.service
    .get_id_category('may-tinh-bang')
    .subscribe((kq:any)=>{
      var id_category = kq['data'];
      this.cateList2 = [];
      this.service
      .list_product_from_parent(id_category)
      .subscribe((kq2: any)=>{
        console.log(kq2)
        if(kq2['kq'] == 1) {
          this.cateList2 = kq2['data'];
          // this.total = this.cateList1.length;
        }
        // else {this.total = 0}
      })
    })
    

    //get cate list 3
    this.service
    .get_id_category('dien-thoai-di-dong')
    .subscribe((kq:any)=>{
      var id_category = kq['data'];
      this.cateList3 = [];
      this.service
      .list_product_from_parent(id_category)
      .subscribe((kq2: any)=>{
        console.log(kq2)
        if(kq2['kq'] == 1) {
          this.cateList3 = kq2['data'];
          // this.total = this.cateList1.length;
        }
        // else {this.total = 0}
      })
    })
  }

  clickCateSlider(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  get_cart(){
    return this.cart$.pipe(map((data:any) => data));
  }

  // getKQ(){
  //   return this.info$.pipe(map((data:any) => data));
  // }


  array_product:any;
  array = [];

  ngOnInit(): void {
    this.callJquery()

    this.service
    .list_product()
    .subscribe((kq:any)=>{
      this.array_product = kq['data'];
      //console.log(this.array_product);
    })
    // this.getKQ()
    // .subscribe((kq:any)=>{
    //   //this.array = kq;
    //   console.log(kq);
    // })

    // Lấy danh sách giỏ hàng
    this.get_cart()
    .subscribe((kq:any)=>{
      //console.log(kq)
    });

    this.token = localStorage.getItem('key_token')

    this.getCategoryList()
  }

  // change_color(){
  //   //this.color2 = 'black';
  // }

  // abc:any;

  // add(id:any, name:any, age:any){
  //   this.abc = this.store.dispatch(addInfo(new Info(parseInt(id.value), name.value, parseInt(age.value))))
  //   //this.currentValue = this.abc.length;
  //   // this.getKQ()
  //   // .subscribe((kq:any)=>{
  //   //   console.log(kq.info.length)
  //   // })
  // }

  // edit(id:any, name:any, age:any){
  //   this.store.dispatch(updateInfo(new Info(parseInt(id), name, parseInt(age))));
  // }

  // delete(id:any){
  //   this.store.dispatch(deleteInfo(id));
  // }

  add_to_cart(id:any, name:any, price:any, qty:any){
    this.store.dispatch(addCart(new Cart(this.token.id_user, name, id, parseInt(price),parseInt(qty))))
  }

}
