import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';
import { RecommendedListComponent } from './recommended-list/recommended-list.component';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.component.html',
    styleUrls: ['./discover.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RecommendedListComponent]
})
export class DiscoverComponent implements OnInit {
  private dataComponentService = inject(DataComponentService);

  height = '0px';
  recommendations = ['categories', 'Simulation'];

  ngOnInit() {
    this.height = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }

}
