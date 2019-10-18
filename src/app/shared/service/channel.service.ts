import { Channel } from '../model/channel.model';

export class ChannelService {
    channels: Channel[] = [
        new Channel('Channel1', 'c1.jpg', 'live.jpg'),
        new Channel('Channel2', 'c2.png', 'live.jpg'),
        new Channel('Channel3', 'c3.png', 'live.jpg'),
        new Channel('Channel3', 'c4.png', 'live.jpg')
    ];

    constructor() {}

    getChannels() {
        return this.channels.slice();
    }
}

