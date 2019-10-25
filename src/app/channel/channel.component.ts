 import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
 import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 import { ChannelService } from '../shared/service/channel.service';
 import { Channel } from '../shared/model/channel.model';
 import { ActivatedRoute } from '@angular/router';
 import { Subject } from 'rxjs';


 @Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {
  @ViewChild('videoContainer', {static: true}) iframe: ElementRef;
  // videoUrl = 'https://www.youtube.com/watch?v=LembwKDo1Dk';
  videoUrl = 'https://www.youtube.com/embed/LembwKDo1Dk';
  // videoUrlSanitized: SafeResourceUrl;
  player: YT.Player;
  private id = 'LembwKDo1Dk';
  interval;
  currentTime: number;
  private width = 100;
  private heigth = 100;
  private RATIO_16_9 = [16, 9];
  private RATIO_4_3 = [4, 3];
  channel: Channel;

  constructor(private sanitizer: DomSanitizer,
              private channelService: ChannelService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.channel = this.channelService.getChannel(this.route.snapshot.params.channel);
  }

  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
    this.playerConfig(this.player, this.RATIO_16_9);
    // console.log( this.player.getDuration());
  }

  playerConfig(player, ratio: number[]) {
    // console.log('video div', this.iframe);
    this.width = this.iframe.nativeElement.offsetWidth;
    this.heigth = this.calculateHeight(
      this.width,
      ratio[0],
      ratio[1]);
    player.setSize(this.width, this.heigth);

    this.startTimer();
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.currentTime = this.player.getCurrentTime();
      this.channelService.currentTimeChanged.next(this.currentTime);
    }, 100);
  }

  private calculateHeight(width: number, ratio1: number, ratio2: number): number {
    // console.log(width * ratio2 / ratio1);
    return width * ratio2 / ratio1;
  }

  onResize() {
    // console.log('Resize');
    this.playerConfig(this.player, this.RATIO_16_9);
  }

  ngOnDestroy() {

  }
}
