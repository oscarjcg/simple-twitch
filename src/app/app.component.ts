import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SimpleChannelListComponent } from './simple-channel-list/simple-channel-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [HeaderComponent, SimpleChannelListComponent, RouterOutlet]
})
export class AppComponent {
  title = 'simple-twitch';
}
