import { Component, OnInit } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';

// Gọi form lấy dữ liệu và kiểm tra dữ liệu bên trong file .ts
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from '../Models/product';

// Gọi ActivatedRoute, ParamMap
import { Router, Event as NavigationEvent } from '@angular/router';

declare var $:any

@Component({
  selector: 'app-ad-product-add',
  templateUrl: './ad-product-add.component.html',
  styleUrls: ['./ad-product-add.component.css']
})

export class AdProductAddComponent implements OnInit {

  // Khai báo sử dụng và kiểm tra dữ liệu trong file ts
  productForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    price: new FormControl('', [Validators.minLength(3), Validators.pattern('[0-9]*'), Validators.required]),
    parent: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.maxLength(2), Validators.pattern('[0-9]*')]),
    detail: new FormControl('', []),
    image: new FormControl('', [Validators.minLength(3)]),
    image2: new FormControl('', [Validators.minLength(3)]),
    image3: new FormControl('', [Validators.minLength(3)])
  })


  get name() { return this.productForm.controls.name; }
  get price() { return this.productForm.controls.price; }
  get parent() { return this.productForm.controls.parent; }
  get discount() { return this.productForm.controls.discount; }
  get detail() { return this.productForm.controls.detail; }
  get image() { return this.productForm.controls.image; }
  get image2() { return this.productForm.controls.image2; }
  get image3() { return this.productForm.controls.image3; }

  categoryParentList:any = []

  constructor(private service: AppService, private router: Router) {}

  get_value_form(data: any) {
    console.log(data)
    data.slug = this.changToSlug(data.name)
    var galleryList = []
    galleryList.push(data.image, data.image2, data.image3)
    data.gallery = galleryList
    var product = new Product(null, data.name, data.slug, data.parent._id, data.price,
      data.discount, data.gallery, data.status, data.detail, data.image, new Date(), null)
    console.log(product)
    this.service
    .api_add_item_product(product)
    .subscribe((kq:any)=>{
      if(kq['kq'] == 1){
        // báo thành công
        alert('Đã thêm ' + kq['data'].name)
        window.location.replace('/admin/product')
      }else{
        // báo thất bại
        alert('Thất bại!')
      }
      
      console.log(kq)
    })
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

  get_category_parent() {
    this.service.api_get_category_list()
    .subscribe((kq:any) => {
      // console.log(kq)
      if(kq['kq']==1){
        kq['data'].forEach(element => {
          if(element.parent != null)
            this.categoryParentList.push(element)
        });
      }
    })
  }

  ngOnInit(): void {
    this.get_category_parent()
  }

}
