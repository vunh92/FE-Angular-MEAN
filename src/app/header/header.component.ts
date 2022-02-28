import { Component, OnInit, Input } from '@angular/core';

// // Gọi actions và models
// import { addLogin } from '../Store/Actions/login.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Gọi actions và models
import { login, logout } from '../Store/Actions/login.actions';
// Gọi ActivatedRoute, ParamMap
import { Router, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() _title:any;

  cart$: Observable<[]>;
  isLogin: Observable<boolean>;

  currentValue: Number = 0;

  // isLogin:any = false

  constructor(private store: Store<{ cart: [], login: boolean }>, private router: Router) {
    this.cart$ = store.select('cart');
    this.isLogin = store.select('login');
  }

  get_cart(){
    return this.cart$.pipe(map((data:any) => data));
  }

  logout(){
    localStorage.removeItem('key_token')
    localStorage.removeItem('key_id_user')
    this.store.dispatch(logout())
    alert('Bạn đã đăng xuất!')
    this.router.navigate(['/dang-nhap'])
      .then(() => {
        window.location.reload()
      })
  }

  ngOnInit(): void {
    //console.log(this._title);
    // this.get_cart()
    // .subscribe((kq:any)=>{
    //   this.currentValue = kq.length;
    // });
    // if(localStorage.getItem('key_token')){
    //   console.log(localStorage.getItem('key_token'))
    // }

  }

  search(t:any){
    alert(t.value);
  }

}
