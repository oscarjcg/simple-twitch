import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DiscoverComponent } from './discover/discover.component';
import { BrowseComponent } from './browse/browse.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryListComponent } from './browse/category-list/category-list.component';
import { CategoryItemComponent } from './browse/category-list/category-item/category-item.component';
import { CategoryService } from './shared/service/category.service';
import { ChannelListComponent } from './browse/channel-list/channel-list.component';
import { ChannelItemComponent } from './browse/channel-list/channel-item/channel-item.component';
import { ChannelService } from './shared/service/channel.service';
import { AppRoutingModule } from './app-routing.module';
import { ChannelComponent } from './channel/channel.component';
import { HeaderChannelComponent } from './channel/header-channel/header-channel.component';
import { ChatComponent } from './channel/chat/chat.component';
import { NgxYoutubePlayerModule } from 'node_modules/ngx-youtube-player';
import { SimpleChannelListComponent } from './simple-channel-list/simple-channel-list.component';
import { SimpleChannelItemComponent } from './simple-channel-list/simple-channel-item/simple-channel-item.component';
import { RecommendedListComponent } from './discover/recommended-list/recommended-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DiscoverComponent,
    BrowseComponent,
    FooterComponent,
    CategoryListComponent,
    CategoryItemComponent,
    ChannelListComponent,
    ChannelItemComponent,
    ChannelComponent,
    HeaderChannelComponent,
    ChatComponent,
    SimpleChannelListComponent,
    SimpleChannelItemComponent,
    RecommendedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
