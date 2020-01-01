import { Channel } from '../model/channel.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ChannelService {
    // channels: Channel[] = [
    //     new Channel('Channel1', 'c1.jpg', 'live.jpg'),
    //     new Channel('Channel2', 'c2.png', 'live.jpg'),
    //     new Channel('Channel3', 'c3.png', 'live.jpg'),
    //     new Channel('Channel4', 'c4.png', 'live.jpg')
    // ];
    channels: Channel[] = [];
    channelChanged = new Subject<Channel[]>();
    currentTimeChanged = new Subject<number>();
    // Backend
    private BASE_URL = 'https://rocky-forest-64018.herokuapp.com/';
    // private BASE_URL = 'http://localhost:3000/';

    constructor(private http: HttpClient) {}

    fetchChannels() {
        this.http.get<Channel[]>(this.BASE_URL + 'channels')
        .subscribe(channels => {
            this.channels = channels.map(
                channel => {
                    // console.log('C ', channel);
                    const image = 'data:image/png;base64,' +
                        btoa(new Uint8Array(channel.image.data.data).reduce((data, byte) => {
                            return data + String.fromCharCode(byte);
                        }, ''));
                    const preview = 'data:image/png;base64,' +
                    btoa(new Uint8Array(channel.preview.data.data).reduce((data, byte) => {
                        return data + String.fromCharCode(byte);
                    }, ''));
                    return Channel.from({...channel, imageBase64: image, previewBase64: preview});
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

