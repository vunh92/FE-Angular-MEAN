import { Component, OnInit } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';

// Gọi ActivatedRoute, ParamMap
import { Router, Event as NavigationEvent } from '@angular/router';

// Gọi actions và models
import { login, logout } from '../Store/Actions/login.actions';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAlert:any;
  // isLogin:any;
  login$: Observable<boolean>;

  constructor(private router: Router, private service: AppService, private store: Store<{ login: boolean}>) { 
    this.login$ = store.select('login');
  }

  setLogin(data:any){
    // this.login$.pipe(map((data:any) => data));
    // this.store.dispatch(updateLogin(data))
    if(data){
      this.store.dispatch(login())
    }else {
      this.store.dispatch(logout())
    }
  }

  close() {
    this.isAlert = null;
  }

  get_data_Login(data:any)
  {
    // localstorage

    // 1. tạo
    //localStorage.setItem('key', 'hello localstorage');
    // 2. lấy sử dụng
    //localStorage.getItem('key');
    // 3. xóa
    //localStorage.removeItem("key");

    if(data.username == '' || data.password == ''){
      this.isAlert = {
        type: 'danger',
        message: 'Tài khoản hoặc mật khẩu không được để trống!'
      }
    }else {
      this.isAlert = null
    }

    this.service
    .send_data_login(data)
    .subscribe((kq:any)=>{
      console.log(this.login$)
      localStorage.removeItem('key_token')
      if(kq['kq'] == 1) {
        localStorage.setItem('key_token', kq['token'].token)
        localStorage.setItem('key_id_user', kq['token'].id_user)
        this.setLogin(true)
        alert('Chào mừng bạn!')
        this.router.navigate([''])
          .then(() => {
            window.location.reload()
            // this.login$ = this.login$.pipe(map((data:any) => data));
            // window.scroll({ 
            //   top: 0, 
            //   left: 0, 
            //   behavior: 'smooth' 
            // });
          })
      }else {
        this.setLogin(false)
        // this.isLogin = this.login$.pipe(map((data:any) => data));
        this.isAlert = {
          type: 'danger',
          message: kq['err']
        }
      }
      console.log(this.login$)
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('key_token')){
      this.store.dispatch(login())
      // this.isLogin = localStorage.getItem('key_token') != null;
    }
    // console.log(this.login$)
  }

}
