import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommentChat } from 'src/app/shared/model/comment.model';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { Subscription } from 'rxjs';
import { DataComponentService } from 'src/app/shared/service/data-component.service';
import {Channel} from "../../shared/model/channel.model";
import {ChatSocketIoService} from "../../shared/service/chat-socket-io.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer', {static: true}) chatContainer: ElementRef;
  @ViewChild('inputChat', {static: true}) inputChat: ElementRef;
  comments: CommentChat[] = [];
  timeSec = 0;
  currentTimeSubs: Subscription;
  allComments: CommentChat[] = [];
  heightChat = '700px';
  manualScroll = false;
  autoScroll = true;

  @Input() channel: Channel;

  constructor(private chatService: ChatService,
              private channelService: ChannelService,
              private dataComponentService: DataComponentService,
              private chatSocketIoService: ChatSocketIoService) { }

  ngOnInit() {
    this.chatService.commentsChanged
      .subscribe(comments => {
        this.allComments = comments;
        this.comments = this.allComments;
      });

    this.timeSec = 0;
    //this.allComments = this.chatService.getComments();
    this.loadCommentsUntil(this.timeSec);

    this.currentTimeSubs = this.channelService.currentTimeChanged.subscribe(newTime => {
      this.timeSec = newTime;
      /*
      this.loadCommentsUntil(this.timeSec);

      if (!this.manualScroll) {
        this.chatContainer.nativeElement.scrollTop =
            this.chatContainer.nativeElement.scrollHeight - this.chatContainer.nativeElement.clientHeight;
        this.autoScroll = true;
      }
       */

    });

    this.chatSocketIoService.chatMessagesChanged.subscribe(() => {
      this.chatService.fetchComments(this.channel.name);
    });


    this.heightChat = this.dataComponentService.calculateHeightNoHeader() + 'px';
    this.chatService.fetchComments(this.channel.name);
  }

  onScroll(event) {
    if (!this.autoScroll) {
      this.manualScroll = true;
    }
    this.autoScroll = false;
  }

  addInput() {
    //const comment = new CommentChat(0, 'Angular App', this.inputChat.nativeElement.value);
    this.chatService.addComment(this.channel.name, this.channel.id, 'Angular App', this.inputChat.nativeElement.value);
    this.inputChat.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.currentTimeSubs.unsubscribe();
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
