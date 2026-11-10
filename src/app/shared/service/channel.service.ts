import { environment } from '../../../environments/environment';
import { Channel } from '../model/channel.model';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ChannelService {
    private http = inject(HttpClient);


    channels: Channel[] = [];
    channelChanged = new Subject<Channel[]>();
    currentTimeChanged = new Subject<number>();

    private BASE_URL = environment.apiUrl;

    fetchChannels() {
        this.http.get<Channel[]>(this.BASE_URL + 'channel')
        .subscribe(channels => {
            this.channels = channels.map(
                channel => {
                    channel.type = channel.channelTypeId;
                    return Channel.from({...channel, imageBase64: channel.image, previewBase64: channel.preview});
                    // return {...channel, imageBase64: image, previewBase64: preview, getName: Channel.caller};
            });

            // console.log(this.channels.slice());

            this.channelChanged.next(this.channels.slice());
        });
    }

    getChannels() {
        return this.channels.slice();
    }

    getChannel(name: string) {
        return this.channels.find((channel) => {
            return channel.getName() === name;
        });
    }
}

