import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DiscoverComponent } from './discover/discover.component';
import { BrowseComponent } from './browse/browse.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryListComponent } from './browse/category-list/category-list.component';
import { CategoryItemComponent } from './browse/category-list/category-item/category-item.component';
import { CategoryService } from './shared/category.service';
import { ChannelListComponent } from './browse/channel-list/channel-list.component';
import { ChannelItemComponent } from './browse/channel-list/channel-item/channel-item.component';
import { ChannelService } from './shared/service/channel.service';

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
    ChannelItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CategoryService, ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
