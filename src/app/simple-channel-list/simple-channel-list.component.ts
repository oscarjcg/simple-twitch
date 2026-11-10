import { Component, OnInit, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataComponentService } from '../shared/service/data-component.service';
import { Channel } from '../shared/model/channel.model';
import { ChannelService } from '../shared/service/channel.service';
import { SimpleChannelItemComponent } from './simple-channel-item/simple-channel-item.component';

@Component({
    selector: 'app-simple-channel-list',
    templateUrl: './simple-channel-list.component.html',
    styleUrls: ['./simple-channel-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SimpleChannelItemComponent],
    host: { '(window:resize)': 'onResize()' }
})
export class SimpleChannelListComponent implements OnInit {
  private dataComponentService = inject(DataComponentService);
  private channelService = inject(ChannelService);
  private destroyRef = inject(DestroyRef);

  heightList = '500px';
  channels: Channel[] = [];

  ngOnInit() {
    this.channelService.channelChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(channels => {
        this.channels = channels;
      });
    this.channelService.fetchChannels();

    setTimeout(() => this.onResize(), 0);
  }

  onResize() {
    this.heightList = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }
}
