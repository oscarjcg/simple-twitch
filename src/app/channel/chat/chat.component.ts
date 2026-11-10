import { Component, OnInit, ElementRef, ChangeDetectionStrategy, DestroyRef, inject, input, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommentChat } from 'src/app/shared/model/comment.model';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { DataComponentService } from 'src/app/shared/service/data-component.service';
import { Channel } from '../../shared/model/channel.model';
import { ChatSocketIoService } from '../../shared/service/chat-socket-io.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    host: { '(window:resize)': 'onResize()' }
})
export class ChatComponent implements OnInit {
  private chatService = inject(ChatService);
  private channelService = inject(ChannelService);
  private dataComponentService = inject(DataComponentService);
  private chatSocketIoService = inject(ChatSocketIoService);
  private destroyRef = inject(DestroyRef);

  readonly chatContainer = viewChild.required<ElementRef<HTMLElement>>('chatContainer');
  readonly inputChat = viewChild.required<ElementRef<HTMLInputElement>>('inputChat');
  readonly channel = input.required<Channel>();

  comments: CommentChat[] = [];
  timeSec = 0;
  allComments: CommentChat[] = [];
  heightChat = '700px';
  manualScroll = false;
  autoScroll = true;

  ngOnInit() {
    this.chatService.commentsChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(comments => {
        this.allComments = comments;
        this.comments = this.allComments;
      });

    this.timeSec = 0;
    this.loadCommentsUntil(this.timeSec);

    this.channelService.currentTimeChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(newTime => {
        this.timeSec = newTime;
        /*
        this.loadCommentsUntil(this.timeSec);

        if (!this.manualScroll) {
          const el = this.chatContainer().nativeElement;
          el.scrollTop = el.scrollHeight - el.clientHeight;
          this.autoScroll = true;
        }
         */
      });

    this.chatSocketIoService.chatMessagesChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.chatService.fetchComments(this.channel().name);
      });

    this.heightChat = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.chatService.fetchComments(this.channel().name);
  }

  onScroll(event) {
    if (!this.autoScroll) {
      this.manualScroll = true;
    }
    this.autoScroll = false;
  }

  addInput() {
    const input = this.inputChat().nativeElement;
    this.chatService.addComment(this.channel().name, this.channel().id, 'Angular App', input.value);
    input.value = '';
  }

  private loadCommentsUntil(seconds: number) {
    /*
    this.comments = this.allComments.filter(value => {
      return value.timeSeconds <= seconds;
    });
     */
    this.comments = this.allComments;
  }

  onResize() {
    this.heightChat = this.dataComponentService.calculateHeightNoHeader() + 'px';
  }
}
