import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Channel } from 'src/app/shared/model/channel.model';

@Component({
    selector: 'app-channel-item',
    templateUrl: './channel-item.component.html',
    styleUrls: ['./channel-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class ChannelItemComponent {
  readonly channel = input.required<Channel>();
}
