import { environment } from '../../environments/environment';
import { Component, OnInit, ElementRef, OnDestroy, ChangeDetectionStrategy, DestroyRef, effect, inject, input, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YouTubePlayer } from '@angular/youtube-player';
import { ChannelService } from '../shared/service/channel.service';
import { Channel } from '../shared/model/channel.model';
import { DataComponentService } from '../shared/service/data-component.service';
import { ChatSocketIoService } from '../shared/service/chat-socket-io.service';
import { HeaderChannelComponent } from './header-channel/header-channel.component';
import { ChatComponent } from './chat/chat.component';

@Component({
    selector: 'app-channel',
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HeaderChannelComponent, YouTubePlayer, ChatComponent],
    host: { '(window:resize)': 'onResize()' }
})
export class ChannelComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private channelService = inject(ChannelService);
  private dataComponentService = inject(DataComponentService);
  private chatSocketIoService = inject(ChatSocketIoService);
  private destroyRef = inject(DestroyRef);

  readonly channelName = input<string>(undefined, { alias: 'channel' });
  readonly iframe = viewChild.required<ElementRef<HTMLElement>>('videoContainer');

  url: string = environment.models3dUrl;
  urlSafe: SafeResourceUrl;
  player: YT.Player;
  interval;
  currentTime: number;
  width = 100;
  height = 100;
  private RATIO_16_9 = [16, 9];
  public TYPE_YOUTUBE = 1;
  public TYPE_3D_MODEL = 2;

  channel: Channel;

  heightChannel = '700px';
  smallScreen = false;
  bootstrapStack = 768;

  // Temporal fix. Error in initial video config, generates botton bar, on resize is fixed.
  videoInitCorrected = false;

  totalPeople = 0;

  constructor() {
    effect(() => {
      this.channelName();
      this.channel = null;
      this.channelService.fetchChannels();
    });
  }

  ngOnInit() {
    this.channelService.channelChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.channel = this.channelService.getChannel(this.channelName());
        if (this.channel) {
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url + this.channel.content);
        }
      });

    this.heightChannel = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.smallScreen = window.innerWidth <= this.bootstrapStack;

    this.chatSocketIoService.chatPeopleChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(total => {
        this.totalPeople = total;
      });

    this.chatSocketIoService.connectChat();

    this.startTimer();
    this.set3DModelFrameSize(this.RATIO_16_9);
  }

  savePlayer(player) {
    this.player = player;
    this.playerConfig(this.player, this.RATIO_16_9);
  }

  playerConfig(player, ratio: number[]) {
    this.set3DModelFrameSize(ratio);
    player.setSize(this.width, this.height);
  }

  set3DModelFrameSize(ratio: number[]) {
    this.width = this.iframe().nativeElement.clientWidth;
    this.height = this.calculateHeight(this.width, ratio[0], ratio[1]);
  }

  onStateChange(event) {
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
    if (this.player) {
      this.playerConfig(this.player, this.RATIO_16_9);
    }
    this.set3DModelFrameSize(this.RATIO_16_9);

    this.heightChannel = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.smallScreen = window.innerWidth <= this.bootstrapStack;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.chatSocketIoService.disconnectChat();
  }
}
