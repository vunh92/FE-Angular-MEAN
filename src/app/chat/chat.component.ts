import { Component, OnInit } from '@angular/core';

// Gọi socket io
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.getMessage()
    .subscribe((kq:any)=>{
      console.log(kq)
    })
  }

  chat(name:any, email:any, phone:any){
    var obj = { name: name.value, email: email.value, phone: phone.value }
    // emit dữ liệu đi
    this.socket.emit('angular', obj)
  }

  getMessage() {
    // nhận dữ liệu từ nodejs
    return this.socket.fromEvent('nodejs').pipe(map((data:any) => data));
  }

}
