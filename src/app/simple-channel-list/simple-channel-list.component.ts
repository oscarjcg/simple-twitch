import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';
import { Channel } from '../shared/model/channel.model';
import { ChannelService } from '../shared/service/channel.service';

@Component({
  selector: 'app-simple-channel-list',
  templateUrl: './simple-channel-list.component.html',
  styleUrls: ['./simple-channel-list.component.scss']
})
export class SimpleChannelListComponent implements OnInit {
  heightList = '500px';
  channels: Channel[] = [];

  constructor(private dataComponentService: DataComponentService,
              private channelService: ChannelService) {
    this.channels = this.channelService.getChannels();
  }

  ngOnInit() {
    setTimeout(() => {
      this.heightList = this.dataComponentService.calculateHeightNoHeader() + 'px';
    }, 0);
  }

  onResize() {
    this.heightList = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }

}
