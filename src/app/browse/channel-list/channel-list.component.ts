import { Component, OnInit, OnDestroy } from '@angular/core';
import { Channel } from 'src/app/shared/model/channel.model';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit, OnDestroy {
  channels: Channel[] = [];
  subs: Subscription;
  isFetching = true;
  constructor(private channelService: ChannelService) { }

  ngOnInit() {
    this.subs = this.channelService.channelChanged
      .subscribe(channels => {
        this.channels = channels;
        this.isFetching = false;
      });
    this.channelService.fetchChannels();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
