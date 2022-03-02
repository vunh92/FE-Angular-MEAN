import { Component, OnInit } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';

@Component({
  selector: 'app-ad-product',
  templateUrl: './ad-product.component.html',
  styleUrls: ['./ad-product.component.css']
})
export class AdProductComponent implements OnInit {

  productList:any = []

  constructor(private service: AppService) { }

  get_product_list() {
    this.service
    .list_product()
    .subscribe((kq:any) => {
      // console.log(kq)
      if(kq['kq']==1){
        this.productList = kq['data']
      }
    })
  }

  ngOnInit(): void {
    this.get_product_list()
  }

}
