import { Component, OnInit  } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-testscreen',
  templateUrl: './testscreen.component.html',
  styleUrls: ['./testscreen.component.css']
})
export class TestscreenComponent implements OnInit {
  title = 'ng-carousel-demo';
  
  images = [
    {title: 'First Slide', short: 'First Slide Short', src: "https://picsum.photos/id/700/900/500"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "https://picsum.photos/id/1011/900/500"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "https://picsum.photos/id/984/900/500"}
  ];
  
  constructor(private config: NgbCarouselConfig) { 
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.callJquery()
  }

  callJquery(){
    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });

  }

}
