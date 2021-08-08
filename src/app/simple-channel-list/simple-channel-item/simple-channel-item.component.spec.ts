import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChannelItemComponent } from './simple-channel-item.component';

describe('SimpleChannelItemComponent', () => {
  let component: SimpleChannelItemComponent;
  let fixture: ComponentFixture<SimpleChannelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleChannelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleChannelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
