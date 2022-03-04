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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
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

  sendRegister(data:any) {
    if(data.username == '' || data.password == '' || data.confirm == '' || data.email == '' || data.phone == ''){
      this.isAlert = {
        type: 'danger',
        message: 'Chưa nhập đủ thông tin!'
      }
    }else {
      this.isAlert = null
    }

    if(data.password !== data.confirm) {
      this.isAlert = {
        type: 'danger',
        message: 'Xác nhận password chưa khớp!'
      }
      return
    }
    // console.log({data, role: 'guest'})

    this.service
    .send_data_register({data, role: 'guest'})
    .subscribe((kq:any)=>{
      // console.log(this.login$)
      if(kq['kq'] == 1) {
        alert('Đăng ký thành công!')
        window.location.replace('/dang-nhap')
        this.router.navigate(['/dang-nhap'])
          .then(() => {
            // window.location.reload()
            // this.login$ = this.login$.pipe(map((data:any) => data));
            window.scroll({ 
              top: 0, 
              left: 0, 
              behavior: 'smooth' 
            });
          })
      }else {
        // this.setLogin(false)
        // this.isLogin = this.login$.pipe(map((data:any) => data));
        this.isAlert = {
          type: 'danger',
          message: kq['err']
        }
      }
      console.log(kq)
    })
  }

  ngOnInit(): void {
  }

}
