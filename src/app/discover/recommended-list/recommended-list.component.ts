import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/model/category.model';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Channel } from 'src/app/shared/model/channel.model';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommended-list',
  templateUrl: './recommended-list.component.html',
  styleUrls: ['./recommended-list.component.scss']
})
export class RecommendedListComponent implements OnInit, OnDestroy {
  @Input() category = 'categories';

  categories: Category[] = [];
  channels: Channel[] = [];
  WIDTH_CATEGORY_ITEM = 150 + 15;
  WIDTH_CHANNEL_ITEM = 320;
  more = true;
  subs: Subscription;


  @ViewChild('container', {static: true}) container: ElementRef;
  constructor(private categoryService: CategoryService,
              private channelService: ChannelService) { }

  ngOnInit() {
    if (this.category === 'categories') {
      this.subs = this.categoryService.categoriesChanged
      .subscribe(categories => {
        this.categories = categories;
        this.loadList();
      });
      this.categoryService.fetchCategories();
    } else {
      this.subs = this.channelService.channelChanged
      .subscribe(channels => {
        this.channels = channels;
        this.loadList();
      });
      this.channelService.fetchChannels();
    }
  }

  private loadList(rows: number = 1) {
    if (this.category === 'categories') {
      this.loadCategories(rows);
    } else {
      this.loadChannels(rows);
    }
  }

  private loadCategories(rows: number = 1) {
    const cat: Category[] = this.categoryService.getCategories();
    this.more = cat.length > this.calculateSizeList(rows) ? true : false;
    this.categories = cat.slice(0, this.calculateSizeList(rows));
  }

  private loadChannels(rows: number = 1) {
    const ch: Channel[] = this.channelService.getChannels();
    this.more = ch.length > this.calculateSizeList(rows) ? true : false;
    this.channels = ch.slice(0, this.calculateSizeList(rows));
  }

  private calculateSizeList(rows: number = 1) {
    const width = this.container.nativeElement.clientWidth;
    // console.log('Container: ', this.container.nativeElement.clientWidth);
    let nItems = 0;
    if (this.category === 'categories') {
      nItems = Math.floor(width / this.WIDTH_CATEGORY_ITEM);
    } else {
      nItems = Math.floor(width / this.WIDTH_CHANNEL_ITEM);
    }
    // console.log('N Item: ', nItems);
    return rows * nItems;
  }

  onResize() {
    this.loadList();
    this.more = true;
  }

  onMore() {
    this.loadList(2);
    this.more = false;
    console.log('More...');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
