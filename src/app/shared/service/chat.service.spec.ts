import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { CommentChat } from '../model/comment.model';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChatService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('fetches comments for a channel, copies text into comment and emits them', () => {
    const emitted: CommentChat[][] = [];
    service.commentsChanged.subscribe(c => emitted.push(c));

    service.fetchComments('gamer');

    const req = http.expectOne(environment.apiUrl + 'comment/ByChannelName/gamer');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, channel_id: 1, author: 'alice', text: 'Hi' }]);

    expect(emitted.length).toBe(1);
    expect(emitted[0][0].comment).toBe('Hi');
    expect(service.getComments()[0].author).toBe('alice');
  });

  it('getComments returns a copy', () => {
    service.fetchComments('gamer');
    http.expectOne(environment.apiUrl + 'comment/ByChannelName/gamer').flush([{ id: 1, text: 'Hi' }]);

    service.getComments().pop();

    expect(service.getComments().length).toBe(1);
  });

  it('addComment posts the comment as form data', () => {
    service.addComment('gamer', 7, 'Angular App', 'Hello there');

    const req = http.expectOne(environment.apiUrl + 'comment');
    expect(req.request.method).toBe('POST');
    const body = req.request.body as FormData;
    expect(body).toBeInstanceOf(FormData);
    expect(body.get('channel_id')).toBe('7');
    expect(body.get('author')).toBe('Angular App');
    expect(body.get('comment')).toBe('Hello there');
    req.flush({});
  });
});
