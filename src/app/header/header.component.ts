import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataComponentService } from '../shared/service/data-component.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('header', {static: false}) headerRef: ElementRef;

  constructor(private dataComponentService: DataComponentService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataComponentService.heightHeader = this.headerRef.nativeElement.clientHeight;
    // console.log(this.headerRef.nativeElement.clientHeight);
  }

}
