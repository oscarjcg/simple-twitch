import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderChannelComponent } from './header-channel.component';

describe('HeaderChannelComponent', () => {
  let component: HeaderChannelComponent;
  let fixture: ComponentFixture<HeaderChannelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
