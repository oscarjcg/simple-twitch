import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/shared/model/channel.model';
import { ChannelService } from 'src/app/shared/service/channel.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {
  channels: Channel[] = [];
  constructor(private channelService: ChannelService) { }

  ngOnInit() {
    this.channels = this.channelService.getChannels();
  }

}
