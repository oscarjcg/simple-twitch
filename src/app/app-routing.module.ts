import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { DiscoverComponent } from './discover/discover.component';
import { ChannelListComponent } from './browse/channel-list/channel-list.component';
import { CategoryListComponent } from './browse/category-list/category-list.component';

const appRoutes: Routes = [
    { path: '', component: DiscoverComponent, pathMatch: 'full' },
    { path: 'directory', component: BrowseComponent, children: [
        {path: '', component: CategoryListComponent},
        { path: 'all', component: ChannelListComponent }
    ] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
