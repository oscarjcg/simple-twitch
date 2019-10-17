import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  loadedFeature = 'channelList';

  constructor() { }

  ngOnInit() {
  }

  onSelect(feature: string) {
    this.loadedFeature = feature;
  }

}
