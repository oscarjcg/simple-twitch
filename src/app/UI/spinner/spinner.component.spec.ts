import { TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  it('renders the loading animation', () => {
    const fixture = TestBed.createComponent(SpinnerComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.lds-roller > div').length).toBe(8);
  });
});
