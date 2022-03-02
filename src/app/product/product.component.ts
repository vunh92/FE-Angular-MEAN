import { Component, OnInit , ViewEncapsulation  } from '@angular/core';
declare var $: any;

// Gọi ActivatedRoute, ParamMap
import { ActivatedRoute, ParamMap } from '@angular/router';

// Gọi Service
import { AppService } from '../app.service';

// Gọi Store
import { Store } from '@ngrx/store';
// import { increment, decrement, reset } from '../counter.actions';
import { Observable } from 'rxjs';

// Gọi actions và models
import { Cart } from '../Models/cart';
import { Like } from '../Models/like';
import { incrementLike , decrementLike , resetLike  } from '../Store/Actions/count_like.action';
import { incrementCart , decrementCart , resetCart  } from '../Store/Actions/count_cart.action';

import { idUserGlobal , clickAlert} from '../app.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  public clickAny = clickAlert
  // qty: Observable<number>;

  slug:any=''
  name:any=''
  price:any=0
  id_product:any=''
  img:any=''
  gallery:any=[]

  related__products:any;
  isLike:boolean=false

  constructor(private router: ActivatedRoute, private service: AppService, private store: Store<{ cart: [], like: [] , login: boolean , 
    count_like: number, count_cart: number}>) {
    // this.qty = store.select('qty')
  }

  add_to_cart(qty:any){
    if(idUserGlobal == ''){
      alert('Yêu cầu bạn đăng nhập')
      return
    }
    var cart = new Cart(idUserGlobal,this.name,this.id_product,parseInt(this.price),parseInt(qty), this.img)
    this.service
    .post_cart_item(cart)
    .subscribe((kq:any) => {
      if(kq['kq'] == 1){
        this.store.dispatch(incrementCart())
        alert('Thêm giỏ hàng thành công!')
      }else {
        alert(kq['err'])
      }
    })
  }

  add_to_like(){
    if(idUserGlobal == ''){
      alert('Yêu cầu bạn đăng nhập')
      return
    }
    var like = new Like(idUserGlobal, this.name,this.id_product, parseInt(this.price),this.img)
    this.service
    .post_like_item(like)
    .subscribe((kq:any) => {
      if(kq['kq'] == 1){
        this.isLike= true
        this.store.dispatch(incrementLike())
        this.setStatusLikeButton()
        alert('Đã thích!')
      }else {
        alert(kq['err'])
      }
    })
  }

  clickAny_related__products(){
    $('.pro-qty').parent().find('input').val(1)
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  setStatusLikeButton(){
    var likeButton = $('.product__details__add--like').find('i')
    if(this.isLike){
      likeButton.removeClass("fa-heart-o");
      likeButton.addClass("fa-heart");
    }
  }

  ngOnInit(): void {
    this.router
    .paramMap
    .subscribe((params:ParamMap)=>{
      this.slug = params.get('id');

      // Lấy thông tin sản phẩm
      this.service
      .get_info_product(this.slug.split('.')[0])
      .subscribe((kq:any)=>{
        this.name = kq['data'][0].name;
        this.price = kq['data'][0].price;
        this.id_product = kq['data'][0]._id;
        this.img = kq['data'][0].img;
        this.gallery = kq['data'][0].gallery;

        // Lấy ra sản phẩm liên quan
        this.service
        .related__products(this.id_product, kq['data'][0].parent)
        .subscribe((kq2:any)=>{
          if(kq2['kq'] == 1) 
            this.related__products = kq2['data']
          else 
            this.related__products = []
        })

         // Lấy sản phẩm yêu thích
         this.service
         .get_like_item(idUserGlobal, this.id_product)
         .subscribe((kq2:any)=>{
            this.isLike = kq2['kq'] == 1
            this.setStatusLikeButton()
          })
      })
    });

    this.callJquery()
  }

  callJquery(){
     /*------------------
      Single Product
    --------------------*/
    $('.product__details__pic__slider img').on('click', function () {
      var imgurl = $(this).data('imgbigurl');
      console.log(imgurl)
      var bigImg = $('.product__details__pic__item--large').attr('src');
      if (imgurl != bigImg) {
          $('.product__details__pic__item--large').attr({
              src: imgurl
          });
      }
    });

    /*-------------------
      Quantity change
    --------------------- */
    var proQty = $('.pro-qty');
    // proQty.prepend('<span class="dec qtybtn">-</span>');
    // proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc')) {
          var newVal = parseFloat(oldValue) + 1;
      } else {
          // Don't allow decrementing below zero
          if (oldValue > 1) {
              var newVal = parseFloat(oldValue) - 1;
          } else {
              newVal = 1;
          }
      }
      $button.parent().find('input').val(newVal);
    });

  }

}
