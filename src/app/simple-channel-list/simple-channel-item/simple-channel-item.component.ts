import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/shared/model/channel.model';

@Component({
  selector: 'app-simple-channel-item',
  templateUrl: './simple-channel-item.component.html',
  styleUrls: ['./simple-channel-item.component.scss']
})
export class SimpleChannelItemComponent implements OnInit {
  @Input() channel: Channel;

  constructor() { }

  ngOnInit() {
  }

}
