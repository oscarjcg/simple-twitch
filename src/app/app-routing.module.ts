import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { DiscoverComponent } from './discover/discover.component';
import { ChannelListComponent } from './browse/channel-list/channel-list.component';
import { CategoryListComponent } from './browse/category-list/category-list.component';
import { ChannelComponent } from './channel/channel.component';
import { GameComponent } from './browse/game/game.component';

const appRoutes: Routes = [
    { path: '', component: DiscoverComponent, pathMatch: 'full' },
    { path: 'directory/game', children: [
        { path: ':game', component: GameComponent, children: [
            { path: '', component: ChannelListComponent},
            { path: 'videos/all', component: ChannelListComponent},
            { path: 'clips', component: ChannelListComponent}
        ]}
    ]},
    { path: 'directory', component: BrowseComponent, children: [
        { path: '', component: CategoryListComponent},
        { path: 'all', component: ChannelListComponent},
        { path: 'game', component: CategoryListComponent},
    ]},
    { path: ':channel', component: ChannelComponent, children: [
        { path: '', component: ChannelComponent},
        { path: 'videos', component: ChannelComponent},
        { path: 'clips', component: ChannelComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
