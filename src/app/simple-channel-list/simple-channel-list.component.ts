import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';
import { Channel } from '../shared/model/channel.model';
import { ChannelService } from '../shared/service/channel.service';
import { CategoryService } from '../shared/service/category.service';

@Component({
  selector: 'app-simple-channel-list',
  templateUrl: './simple-channel-list.component.html',
  styleUrls: ['./simple-channel-list.component.scss']
})
export class SimpleChannelListComponent implements OnInit {
  heightList = '500px';
  channels: Channel[] = [];
  img = '';

  constructor(private dataComponentService: DataComponentService,
              private channelService: ChannelService) {

  }

  ngOnInit() {
    this.channelService.channelChanged
      .subscribe(channels => {
        this.channels = channels;
      });
    this.channelService.fetchChannels();

    setTimeout(() => {
      this.heightList = this.dataComponentService.calculateHeightNoHeader() + 'px';
    }, 0);
  }

  onResize() {
    this.heightList = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }
}
