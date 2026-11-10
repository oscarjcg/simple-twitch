import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Channel } from 'src/app/shared/model/channel.model';

@Component({
    selector: 'app-simple-channel-item',
    templateUrl: './simple-channel-item.component.html',
    styleUrls: ['./simple-channel-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class SimpleChannelItemComponent {
  readonly channel = input.required<Channel>();
}
