import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Gọi service
import { AppService } from '../app.service';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Output() callParentFunction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: AppService) { }

  subscribeEmail(submitEmail:any){
    if(submitEmail.value == ''){
      return
    }
    var email =  $('#footer_send_mail--input')
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(submitEmail.value)) { 
      alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
      email.focus();
      return
    }

    this.service
    .api_send_mail(submitEmail.value)
    .subscribe((kq:any)=>{
      if(kq['kq'] == 1) {
        email.val('')
        alert(kq['data'])
      }
      else {
        alert(kq['err'])
      }
    })
  }

  ngOnInit(): void {
    // this.callParentFunction.emit('string child');
  }

}
