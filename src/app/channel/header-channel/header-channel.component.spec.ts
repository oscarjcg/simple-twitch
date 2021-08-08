import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderChannelComponent } from './header-channel.component';

describe('HeaderChannelComponent', () => {
  let component: HeaderChannelComponent;
  let fixture: ComponentFixture<HeaderChannelComponent>;

  beforeEach(async(() => {
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
