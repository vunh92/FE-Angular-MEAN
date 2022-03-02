import { Component, OnInit } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';

// Gọi form lấy dữ liệu và kiểm tra dữ liệu bên trong file .ts
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any

@Component({
  selector: 'app-ad-product-add',
  templateUrl: './ad-product-add.component.html',
  styleUrls: ['./ad-product-add.component.css']
})

export class AdProductAddComponent implements OnInit {

  // Khai báo sử dụng và kiểm tra dữ liệu trong file ts
  product = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    price: new FormControl('', [Validators.minLength(3), Validators.pattern('[0-9]*'), Validators.required]),
    parent: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.maxLength(2), Validators.pattern('[0-9]*')]),
    type: new FormControl('', []),
    note: new FormControl('', []),
    detail: new FormControl('', []),
    detail2: new FormControl('', []),
    detail3: new FormControl('', []),
    img: new FormControl('', [Validators.minLength(3)])
  })


  get name() { return this.product.controls.name; }
  get price() { return this.product.controls.price; }
  get parent() { return this.product.controls.parent; }
  get discount() { return this.product.controls.discount; }
  get type() { return this.product.controls.type; }
  get note() { return this.product.controls.note; }
  get detail() { return this.product.controls.detail; }
  get detail2() { return this.product.controls.detail2; }
  get detail3() { return this.product.controls.detail3; }
  get image() { return this.product.controls.image; }

  constructor(private service: AppService) {}

  get_value_form(data: any) {
    console.log(data)
    // this.service
    // .send_data_contact(data)
    // .subscribe((kq:any)=>{
    //   if(kq['kq'] == 1){
    //     // báo thành công
    //     // this.isAlert = {
    //     //   type: 'success',
    //     //   message: 'Thành công'
    //     // }
    //   }else{
    //     // báo thất bại
    //     // this.isAlert = {
    //     //   type: 'danger',
    //     //   message: kq['err']
    //     // }
    //   }
    // })
  }

  changToSlug(str:any) {
    // Gộp nhiều dấu space thành 1 space
    str = str.replace(/\s+/g, ' ');
    // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
    str = str.trim();
    // bắt đầu xóa dấu tiếng việt  trong chuỗi
     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
     str = str.replace(/đ/g, "d");
     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
     str = str.replace(/Đ/g, "D");

    //thay dấu space thàng '-'
    str = str.replace(/\s/g, '-');
    //thay chữ hoa thành chữ thường
    str = str.toLowerCase();
    //thêm đuôi '.com'
    // str = str + '.com';
     return str;
  }


  ngOnInit(): void {
  }

}
