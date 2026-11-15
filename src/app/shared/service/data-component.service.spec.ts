import { TestBed } from '@angular/core/testing';
import { DataComponentService } from './data-component.service';

describe('DataComponentService', () => {
  it('returns the window height minus the header height', () => {
    const service = TestBed.inject(DataComponentService);
    service.heightHeader = 50;

    expect(service.calculateHeightNoHeader()).toBe(window.innerHeight - 50);
  });
});
