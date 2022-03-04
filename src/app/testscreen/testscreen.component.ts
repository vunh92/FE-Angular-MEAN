import { Component, OnInit  } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';

// Gọi form lấy dữ liệu và kiểm tra dữ liệu bên trong file .ts
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-testscreen',
  templateUrl: './testscreen.component.html',
  styleUrls: ['./testscreen.component.css']
})
export class TestscreenComponent implements OnInit {
  
  constructor(private service: AppService) {}

  isAlert:any;

  ngOnInit(): void {
  }

  arr_contact = {
    email: 'nguyenvana@gmail.com'
  }

  get_value_form(submitEmail:any)
  {
    console.log(submitEmail.email)
    if(submitEmail.email == ''){
      return
    }
    // var email =  $('#footer_send_mail--input')
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(submitEmail.email)) { 
      alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
      // email.focus();
      return
    }

    this.service
    .api_send_mail(submitEmail.email)
    .subscribe((kq:any)=>{
      if(kq['kq'] == 1) {
        // email.val('')
        alert(kq['data'])
        window.location.replace('/dang-nhap')
      }
      else {
        alert(kq['err'])
      }
    })
   
  }
  
  // Khai báo sử dụng và kiểm tra dữ liệu trong file ts
  contact = new FormGroup({
    email: new FormControl('', [Validators.minLength(3)]),
  })

  get email(){ return this.contact.controls.email; }

  // get_value_form_control()
  // {
  //   alert(this.contact.value)
  //   // console.log(this.contact.value)
  // }

  close() {
    this.isAlert = null;
  }

}
