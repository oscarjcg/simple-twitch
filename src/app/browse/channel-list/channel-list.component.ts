import { Component, OnInit, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Channel } from 'src/app/shared/model/channel.model';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { SpinnerComponent } from '../../UI/spinner/spinner.component';
import { ChannelItemComponent } from './channel-item/channel-item.component';

@Component({
    selector: 'app-channel-list',
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SpinnerComponent, ChannelItemComponent]
})
export class ChannelListComponent implements OnInit {
  private channelService = inject(ChannelService);
  private destroyRef = inject(DestroyRef);

  channels: Channel[] = [];
  isFetching = true;

  ngOnInit() {
    this.channelService.channelChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(channels => {
        this.channels = channels;
        this.isFetching = false;
      });
    this.channelService.fetchChannels();
  }
}
