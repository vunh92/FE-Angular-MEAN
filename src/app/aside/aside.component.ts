import { Component, OnInit } from '@angular/core';

// Gọi service
import { AppService } from '../app.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor(private service: AppService) { }

  aside:any;

  ngOnInit(): void {
    this.service
    .list_aside()
    .subscribe((kq:any)=>{
      this.aside = kq['data'];
      //console.log(this.aside);
    })
  }

}
