import { Channel } from '../model/channel.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChannelService {
    channels: Channel[] = [
        new Channel('Channel1', 'c1.jpg', 'live.jpg'),
        new Channel('Channel2', 'c2.png', 'live.jpg'),
        new Channel('Channel3', 'c3.png', 'live.jpg'),
        new Channel('Channel4', 'c4.png', 'live.jpg')
    ];
    currentTimeChanged = new Subject<number>();

    constructor() {}

    getChannels() {
        return this.channels.slice();
    }

    getChannel(name: string) {
        return this.channels.find((channel) => {
            return channel.getName() === name;
        });
    }
}

