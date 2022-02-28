import { Component, OnInit } from '@angular/core';

// Gọi Service
import { AppService } from '../app.service';

@Component({
  selector: 'app-infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.css']
})
export class InfouserComponent implements OnInit {

  id_user:any = ''
  inforUser:any

  constructor(private service: AppService) { }

  clickIcon(msg:any){
    alert(msg)
  }

  ngOnInit(): void {
    if(localStorage.getItem('key_id_user')){
      this.id_user = localStorage.getItem('key_id_user');
    }

    this.service
    .get_info_user(this.id_user)
    .subscribe((kq:any)=>{
      if(kq['kq'] == 1) {
        this.inforUser = kq['data'][0]
        // console.log(this.inforUser)
      }
    })
    
  }

}
