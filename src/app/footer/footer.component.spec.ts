import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('renders', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('footer works!');
  });
});
