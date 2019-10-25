import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentChat } from 'src/app/shared/model/comment.model';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  comments: CommentChat[] = [];
  timeSec = 0;
  currentTimeSubs: Subscription;
  allComments: CommentChat[] = [];

  constructor(private chatService: ChatService,
              private channelService: ChannelService) { }

  ngOnInit() {
    this.allComments = this.chatService.getComments();
    this.loadCommentsUntil(this.timeSec);

    this.currentTimeSubs = this.channelService.currentTimeChanged.subscribe(newTime => {
      this.timeSec = newTime;
      this.loadCommentsUntil(this.timeSec);
    });
  }

  ngOnDestroy() {
    this.currentTimeSubs.unsubscribe();
  }

  private loadCommentsUntil(seconds: number) {
    this.comments = this.allComments.filter(value => {
      return value.timeSeconds <= seconds;
    });
  }

}
