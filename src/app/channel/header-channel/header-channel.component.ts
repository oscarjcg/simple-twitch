import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Channel } from 'src/app/shared/model/channel.model';
import { SpinnerComponent } from '../../UI/spinner/spinner.component';

@Component({
    selector: 'app-header-channel',
    templateUrl: './header-channel.component.html',
    styleUrls: ['./header-channel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SpinnerComponent, RouterLinkActive, RouterLink],
    host: { '(window:resize)': 'onResize()' }
})
export class HeaderChannelComponent implements OnInit {
  readonly channel = input<Channel>();
  smallScreen = false;
  bootstrapStack = 768;

  ngOnInit() {
    this.onResize();
  }

  onResize() {
    this.smallScreen = window.innerWidth <= this.bootstrapStack;
  }
}
