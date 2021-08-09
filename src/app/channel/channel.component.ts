 import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
 import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 import { ChannelService } from '../shared/service/channel.service';
 import { Channel } from '../shared/model/channel.model';
 import { ActivatedRoute, Params } from '@angular/router';
 import { DataComponentService } from '../shared/service/data-component.service';
 import { Subscription } from 'rxjs';
 import {ChatSocketIoService} from "../shared/service/chat-socket-io.service";


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
   url: string = "https://models3d.oscarcatarigutierrez.com/?model=";
   urlSafe: SafeResourceUrl;
  player: YT.Player;
  id = 'LembwKDo1Dk';
  interval;
  currentTime: number;
  width = 100;
  height = 100;
  private RATIO_16_9 = [16, 9];
  private RATIO_4_3 = [4, 3];
  public TYPE_YOUTUBE = 1;
  public TYPE_3D_MODEL = 2;

  channel: Channel;
  subs: Subscription;

  heightChannel = '700px';
  smallScreen = false;
  bootstrapStack = 768;

  // Temporal fix. Error in initial video config, generates botton bar, on resize is fixed.
  videoInitCorrected = false;

  totalPeople:number = 0;

  constructor(private sanitizer: DomSanitizer,
              private channelService: ChannelService,
              private route: ActivatedRoute,
              private dataComponentService: DataComponentService,
              private chatSocketIoService: ChatSocketIoService) {
  }

  ngOnInit() {
    this.subs = this.channelService.channelChanged
      .subscribe(channels => {
        this.channel = this.channelService.getChannel(this.route.snapshot.params.channel);
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url + this.channel.content);
      });

    this.heightChannel = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.smallScreen = (window.innerWidth <= this.bootstrapStack) ? true : false;
    this.route.params
      .subscribe((params: Params) => {
        this.channel = null;
        this.channelService.fetchChannels();
      });

    this.chatSocketIoService.chatPeopleChanged.subscribe(total => {
      this.totalPeople = total;
    });

    this.chatSocketIoService.connectChat();

    this.channelService.fetchChannels();
    this.startTimer();
    this.set3DModelFrameSize(this.RATIO_16_9);
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


  }

  set3DModelFrameSize(ratio: number[]) {
    this.width = this.iframe.nativeElement.clientWidth;
    this.height = this.calculateHeight(
      this.width,
      ratio[0],
      ratio[1]);
  }

  onStateChange(event) {
    // console.log('player state', event.data);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.player) {
        this.currentTime = this.player.getCurrentTime();
        this.channelService.currentTimeChanged.next(this.currentTime);
        if (!this.videoInitCorrected) {
          this.onResize();
          this.videoInitCorrected = true;
        }
      }
    }, 100);
  }

  private calculateHeight(width: number, ratio1: number, ratio2: number): number {
    return width * ratio2 / ratio1;
  }

  onResize() {
    // console.log('Resize');
    if (this.player)
      this.playerConfig(this.player, this.RATIO_16_9);
    this.set3DModelFrameSize(this.RATIO_16_9);

    this.heightChannel = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.smallScreen = (window.innerWidth <= this.bootstrapStack) ? true : false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    clearInterval(this.interval);
    this.chatSocketIoService.disconnectChat();
  }
}
