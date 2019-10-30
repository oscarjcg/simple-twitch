import { Component, OnInit } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  height = '0px';
  recommendations = ['categories', 'Grand Theft Auto V', 'Apex Legends'];

  constructor(private dataComponentService: DataComponentService) { }

  ngOnInit() {
    this.height = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }

}
