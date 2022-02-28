import { Component, OnInit } from '@angular/core';

// Gọi Store
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../counter.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  count: Observable<number>;
  isLogin:any = false

  constructor(private store: Store<{count: number}>) {
    this.count = store.select('count')
  }

  ngOnInit(): void {

    if(localStorage.getItem('key_token')){
      this.isLogin = localStorage.getItem('key_token') != null;
      console.log(this.isLogin)
    }
  }

  _increment(){
    
    this.store.dispatch(increment())
    console.log(this.count)
  }

  _decrement(){
    
    this.store.dispatch(decrement())
    console.log(this.count)
  }

  _reset(){
    this.store.dispatch(reset())
    console.log(this.count)
  }

}
