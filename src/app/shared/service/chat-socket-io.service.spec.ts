import { TestBed } from '@angular/core/testing';

import { ChatSocketIoService } from './chat-socket-io.service';

describe('ChatSocketIoService', () => {
  let service: ChatSocketIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSocketIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
