import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { createChannelServiceStub, provideChannelStub } from '../testing/service-stubs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideChannelStub(createChannelServiceStub())],
    });
  });

  it(`has 'simple-twitch' as title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('simple-twitch');
  });

  it('renders the header, the channel sidebar and the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('app-header')).not.toBeNull();
    expect(el.querySelector('app-simple-channel-list')).not.toBeNull();
    expect(el.querySelector('router-outlet')).not.toBeNull();
  });
});
