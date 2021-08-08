import { Channel } from '../model/channel.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ChannelService {

    channels: Channel[] = [];
    channelChanged = new Subject<Channel[]>();
    currentTimeChanged = new Subject<number>();
    // Backend
    //private BASE_URL = 'https://rocky-forest-64018.herokuapp.com/';
    // private BASE_URL = 'http://localhost:3000/';
    private BASE_URL = 'https://backend-simple-twitch.oscarcatarigutierrez.com/api/';


  constructor(private http: HttpClient) {}

    fetchChannels() {
        this.http.get<Channel[]>(this.BASE_URL + 'channels')
        .subscribe(channels => {
            this.channels = channels.map(
                channel => {

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

