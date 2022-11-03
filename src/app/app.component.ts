import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-twitch';
  smallScreen = false;
  bootstrapStack = 768;

  ngOnInit() {
    //this.smallScreen = (window.innerWidth <= this.bootstrapStack) ? true : false;
  }

  onResize() {
    //this.smallScreen = (window.innerWidth <= this.bootstrapStack) ? true : false;
  }
}
