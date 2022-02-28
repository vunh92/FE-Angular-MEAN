import { Component, OnInit } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';

// Gọi form lấy dữ liệu và kiểm tra dữ liệu bên trong file .ts
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  constructor(private service: AppService) {}

  isAlert:any;

  ngOnInit(): void {
  }

  arr_contact = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '034121211212',
    address: 'Thủ Đức, TP. HCM'
  }

  get_value_form(data:any)
  {
    this.service
    .send_data_contact(data)
    .subscribe((kq:any)=>{
      if(kq['kq'] == 1){
        // báo thành công
        this.isAlert = {
          type: 'success',
          message: 'Thành công'
        }
      }else{
        // báo thất bại
        this.isAlert = {
          type: 'danger',
          message: kq['err']
        }
      }
    })
  }
  
  // Khai báo sử dụng và kiểm tra dữ liệu trong file ts
  contact = new FormGroup({
    name: new FormControl('', [Validators.minLength(3)]),
    email: new FormControl('', [Validators.minLength(3)]),
    phone: new FormControl('', [Validators.minLength(3), Validators.pattern('[0-9]*')]),
    address: new FormControl('', [Validators.minLength(3)])
  })

  get name(){ return this.contact.controls.name; }
  get email(){ return this.contact.controls.email; }
  get phone(){ return this.contact.controls.phone; }
  get address(){ return this.contact.controls.address; }

  // get_value_form_control()
  // {
  //   alert(this.contact.value)
  //   // console.log(this.contact.value)
  // }

  close() {
    this.isAlert = null;
  }

}
