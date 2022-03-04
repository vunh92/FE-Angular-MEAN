import { Component, OnInit } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';


import { idUserGlobal } from '../app.component';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  shipList:any = []

  constructor(private service: AppService) { }

  get_ship_list(){
    this.service
      .api_get_ship_user(idUserGlobal)
      .subscribe((kq:any) => {
        if(kq['kq']==1){
          this.shipList = kq['data']
        }
        console.log(kq)
      })
  }

  ngOnInit(): void {
    this.get_ship_list()
  }

}
