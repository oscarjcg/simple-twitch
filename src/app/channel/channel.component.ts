 import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
 import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 import { ChannelService } from '../shared/service/channel.service';
 import { Channel } from '../shared/model/channel.model';
 import { ActivatedRoute, Params } from '@angular/router';
 import { DataComponentService } from '../shared/service/data-component.service';


 @Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoContainer', {static: true}) iframe: ElementRef;

  // videoUrl = 'https://www.youtube.com/watch?v=LembwKDo1Dk';
  videoUrl = 'https://www.youtube.com/embed/LembwKDo1Dk';
  // videoUrlSanitized: SafeResourceUrl;
  player: YT.Player;
  private id = 'LembwKDo1Dk';
  interval;
  currentTime: number;
  private width = 100;
  private height = 100;
  private RATIO_16_9 = [16, 9];
  private RATIO_4_3 = [4, 3];
  channel: Channel;

  heightChannel = '700px';
  smallScreen = false;
  bootstrapStack = 768;

  // Temporal fix. Error in initial video config, generates botton bar, on resize is fixed.
  videoInitCorrected = false;

  constructor(private sanitizer: DomSanitizer,
              private channelService: ChannelService,
              private route: ActivatedRoute,
              private dataComponentService: DataComponentService) {
  }

  ngOnInit() {
    this.channel = this.channelService.getChannel(this.route.snapshot.params.channel);
    this.heightChannel = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.smallScreen = (window.innerWidth <= this.bootstrapStack) ? true : false;
    this.route.params
      .subscribe((params: Params) => {
        this.channel = this.channelService.getChannel(params.channel);
      });
  }

  ngAfterViewInit() {

  }

  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
    // this.n = this.header.nativeElement.clientWidth;
    this.playerConfig(this.player, this.RATIO_16_9);
    // console.log( this.player.getDuration());
  }

  playerConfig(player, ratio: number[]) {
    // console.log('video div', this.iframe);
    this.width = this.iframe.nativeElement.clientWidth;
    this.height = this.calculateHeight(
      this.width,
      ratio[0],
      ratio[1]);
    player.setSize(this.width, this.height);
    // console.log(this.width + ' h: ' + this.  height);
    // player.setSize(300, 600);

    this.startTimer();
  }

  onStateChange(event) {
    // console.log('player state', event.data);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.currentTime = this.player.getCurrentTime();
      this.channelService.currentTimeChanged.next(this.currentTime);
      if (!this.videoInitCorrected) {
        this.onResize();
        this.videoInitCorrected = true;
      }

    }, 100);
  }

  private calculateHeight(width: number, ratio1: number, ratio2: number): number {
    return width * ratio2 / ratio1;
  }

  onResize() {
    // console.log('Resize');
    this.playerConfig(this.player, this.RATIO_16_9);
    this.heightChannel = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.smallScreen = (window.innerWidth <= this.bootstrapStack) ? true : false;
  }

  ngOnDestroy() {

  }
}
