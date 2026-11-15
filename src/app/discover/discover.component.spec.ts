import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataComponentService } from '../shared/service/data-component.service';
import { DiscoverComponent } from './discover.component';
import { RecommendedListComponent } from './recommended-list/recommended-list.component';

@Component({ selector: 'app-recommended-list', template: '' })
class RecommendedListStub {
  readonly category = input<string>();
}

describe('DiscoverComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [DiscoverComponent] });
    TestBed.overrideComponent(DiscoverComponent, {
      remove: { imports: [RecommendedListComponent] },
      add: { imports: [RecommendedListStub] },
    });
  });

  it('renders one recommended list per recommendation', () => {
    const fixture = TestBed.createComponent(DiscoverComponent);
    fixture.detectChanges();

    const lists = fixture.debugElement.queryAll(By.directive(RecommendedListStub));
    expect(lists.map(l => (l.componentInstance as RecommendedListStub).category())).toEqual(['categories', 'Simulation']);
  });

  it('fills the space below the header', () => {
    TestBed.inject(DataComponentService).heightHeader = 50;
    const fixture = TestBed.createComponent(DiscoverComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.height).toBe(`${window.innerHeight - 50}px`);
  });
});
