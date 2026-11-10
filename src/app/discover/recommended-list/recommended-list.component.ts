import { Component, OnInit, ElementRef, ChangeDetectionStrategy, DestroyRef, inject, input, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from 'src/app/shared/model/category.model';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Channel } from 'src/app/shared/model/channel.model';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { SpinnerComponent } from '../../UI/spinner/spinner.component';
import { CategoryItemComponent } from '../../browse/category-list/category-item/category-item.component';
import { ChannelItemComponent } from '../../browse/channel-list/channel-item/channel-item.component';

@Component({
    selector: 'app-recommended-list',
    templateUrl: './recommended-list.component.html',
    styleUrls: ['./recommended-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [SpinnerComponent, CategoryItemComponent, ChannelItemComponent],
    host: { '(window:resize)': 'onResize()' }
})
export class RecommendedListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private channelService = inject(ChannelService);
  private destroyRef = inject(DestroyRef);

  readonly category = input('categories');
  readonly container = viewChild.required<ElementRef<HTMLElement>>('container');

  categories: Category[] = [];
  channels: Channel[] = [];
  WIDTH_CATEGORY_ITEM = 150 + 15;
  WIDTH_CHANNEL_ITEM = 320;
  more = true;
  isFetching = true;

  ngOnInit() {
    if (this.category() === 'categories') {
      this.categoryService.categoriesChanged
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(categories => {
          this.categories = categories;
          this.loadList();
          this.isFetching = false;
        });
      this.categoryService.fetchCategories();
    } else {
      this.channelService.channelChanged
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(channels => {
          this.channels = channels;
          this.loadList();
          this.isFetching = false;
        });
      this.channelService.fetchChannels();
    }
  }

  private loadList(rows: number = 1) {
    if (this.category() === 'categories') {
      this.loadCategories(rows);
    } else {
      this.loadChannels(rows);
    }
  }

  private loadCategories(rows: number = 1) {
    const cat: Category[] = this.categoryService.getCategories();
    this.more = cat.length > this.calculateSizeList(rows);
    this.categories = cat.slice(0, this.calculateSizeList(rows));
  }

  private loadChannels(rows: number = 1) {
    const ch: Channel[] = this.channelService.getChannels();
    this.more = ch.length > this.calculateSizeList(rows);
    this.channels = ch.slice(0, this.calculateSizeList(rows));
  }

  private calculateSizeList(rows: number = 1) {
    const width = this.container().nativeElement.clientWidth;
    const itemWidth = this.category() === 'categories' ? this.WIDTH_CATEGORY_ITEM : this.WIDTH_CHANNEL_ITEM;
    return rows * Math.floor(width / itemWidth);
  }

  onResize() {
    this.loadList();
    this.more = true;
  }

  onMore() {
    this.loadList(2);
    this.more = false;
  }
}
