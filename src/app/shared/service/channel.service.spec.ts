import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Channel } from '../model/channel.model';
import { ChannelService } from './channel.service';

describe('ChannelService', () => {
  let service: ChannelService;
  let http: HttpTestingController;

  const apiChannels = [
    { id: 1, name: 'gamer', image: 'c1.jpg', preview: 'p1.jpg', content: 'yt1', channelTypeId: 1 },
    { id: 2, name: 'modeler', image: 'c2.jpg', preview: 'p2.jpg', content: 'robot', channelTypeId: 2 },
  ];

  function flushChannels() {
    service.fetchChannels();
    const req = http.expectOne(environment.apiUrl + 'channel');
    expect(req.request.method).toBe('GET');
    req.flush(apiChannels);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChannelService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('maps API channels to Channel instances and emits them', () => {
    const emitted: Channel[][] = [];
    service.channelChanged.subscribe(c => emitted.push(c));

    flushChannels();

    expect(emitted.length).toBe(1);
    const [gamer, modeler] = emitted[0];
    expect(gamer).toBeInstanceOf(Channel);
    expect(gamer.type).toBe(1);
    expect(gamer.imageBase64).toBe('c1.jpg');
    expect(gamer.previewBase64).toBe('p1.jpg');
    expect(modeler.type).toBe(2);
    expect(modeler.getName()).toBe('modeler');
  });

  it('getChannel finds a channel by name', () => {
    flushChannels();

    expect(service.getChannel('modeler')?.id).toBe(2);
    expect(service.getChannel('nobody')).toBeUndefined();
  });

  it('getChannels returns a copy', () => {
    flushChannels();

    service.getChannels().pop();

    expect(service.getChannels().length).toBe(2);
  });

  it('currentTimeChanged forwards values', () => {
    const times: number[] = [];
    service.currentTimeChanged.subscribe(t => times.push(t));

    service.currentTimeChanged.next(12.5);

    expect(times).toEqual([12.5]);
  });
});
