import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/shared/model/channel.model';

@Component({
  selector: 'app-header-channel',
  templateUrl: './header-channel.component.html',
  styleUrls: ['./header-channel.component.scss']
})
export class HeaderChannelComponent implements OnInit {
  @Input() channel: Channel;

  constructor() { }

  ngOnInit() {
  }

}
