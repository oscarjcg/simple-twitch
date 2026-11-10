import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from '../UI/search-bar/search-bar.component';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLinkActive, RouterLink, SearchBarComponent, RouterOutlet]
})
export class BrowseComponent implements OnInit {
  private dataComponentService = inject(DataComponentService);

  height = '0px';

  ngOnInit() {
    this.height = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }

}
