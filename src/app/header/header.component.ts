import { Component, AfterViewInit, ElementRef, ChangeDetectionStrategy, inject, viewChild } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../UI/search-bar/search-bar.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLinkActive, RouterLink, SearchBarComponent]
})
export class HeaderComponent implements AfterViewInit {
  private dataComponentService = inject(DataComponentService);

  readonly headerRef = viewChild.required<ElementRef<HTMLElement>>('header');

  ngAfterViewInit() {
    this.dataComponentService.heightHeader = this.headerRef().nativeElement.clientHeight;
  }
}
