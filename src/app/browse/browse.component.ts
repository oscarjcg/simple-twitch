import { Component, OnInit } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  height = '0px';

  constructor(private dataComponentService: DataComponentService) { }

  ngOnInit() {
    this.height = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }

}
