 import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
 import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


 @Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {
  @ViewChild('iframe', {static: true}) iframe: ElementRef;
  // videoUrl = 'https://www.youtube.com/watch?v=LembwKDo1Dk';
  videoUrl = 'https://www.youtube.com/embed/LembwKDo1Dk';
  // videoUrlSanitized: SafeResourceUrl;
  player: YT.Player;
  private id = 'LembwKDo1Dk';
  interval;
  currentTime: number;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {

  }

  ngAfterInit() {
    // console.log(this.iframe);
    // console.log(this.player.getProgress());

  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
    // console.log(this.player);
    console.log( this.player.getDuration());
    // this.player.playVideo();
    this.startTimer();
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.currentTime = this.player.getCurrentTime();
    }, 100);
  }

  ngOnDestroy() {

  }
}
