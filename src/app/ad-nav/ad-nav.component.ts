import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-ad-nav',
  templateUrl: './ad-nav.component.html',
  styleUrls: ['./ad-nav.component.css']
})
export class AdNavComponent implements OnInit {

  url:any
  selected :any;

  constructor(private router: Router) { 
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.url = event.url
      }
    });
  }

  select(item:any) {
    // this.selected = item; 
  };
  isActive(item:any) {
    return this.url === item;
  };

  isActiveGroup() {
    return this.url === '/tin-tuc' || this.url === '/thong-tin-thanh-vien' ;
  }

  ngOnInit(): void {
  }

}
