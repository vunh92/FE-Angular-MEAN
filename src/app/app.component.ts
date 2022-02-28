import { Component } from '@angular/core';

// Gọi actions và models
import { login, logout } from '../app/Store/Actions/login.actions';
import { getLike  } from '../app/Store/Actions/count_like.action';
import { getCart  } from '../app/Store/Actions/count_cart.action';
import { Store } from '@ngrx/store';

// Gọi Service
import { AppService } from '../app/app.service';

// Gọi ActivatedRoute, ParamMap
import { Router, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root', // tên
  templateUrl: './app.component.html', // html
  styleUrls: ['./app.component.css'] // css
})
export class AppComponent {
  title = 'Hello Angular';
  id_user:any = ''

  constructor(private store: Store<{login: boolean }>,  private router: Router, private service: AppService){
    if(localStorage.getItem('key_token')){
      idUserGlobal= localStorage.getItem('key_id_user')
      this.store.dispatch(login())
      this.getcountLike(idUserGlobal)
      this.getcountCart(idUserGlobal)
    }else {
      idUserGlobal = ''
      this.store.dispatch(logout())
      // this.router.navigate(['/dang-nhap'])
      // .then(() => {
      //   window.scroll({ 
      //     top: 0, 
      //     left: 0, 
      //     behavior: 'smooth' 
      //   });
      // })
    }
  }

  getcountLike(data:any){
    this.service.get_like_list(data)
    .subscribe((kq:any) => {
      if(kq['kq'] == 1){
        this.store.dispatch(getLike(kq['data'].length))
      }
    })
    //console.log(data);
  }

  getcountCart(data:any){
    this.service.get_cart_list(data)
    .subscribe((kq:any) => {
      if(kq['kq'] == 1){
        this.store.dispatch(getCart(kq['data'].length))
      }
    })
    //console.log(data);
  }

  getData(data:any){}
}

export var idUserGlobal = '';

export function clickAlert(msg:any): any{
  alert(msg)
}