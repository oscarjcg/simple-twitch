import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleChannelListComponent } from './simple-channel-list.component';

describe('SimpleChannelListComponent', () => {
  let component: SimpleChannelListComponent;
  let fixture: ComponentFixture<SimpleChannelListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleChannelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
