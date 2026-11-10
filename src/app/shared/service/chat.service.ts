import { environment } from '../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { CommentChat } from '../model/comment.model';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {Channel} from "../model/channel.model";

@Injectable({providedIn: 'root'})
export class ChatService {
  private http = inject(HttpClient);

  private BASE_URL = environment.apiUrl;


  comments: CommentChat[] = [

  ];
  commentsChanged = new Subject<CommentChat[]>();

  fetchComments(name: string) {
    this.http.get<CommentChat[]>(this.BASE_URL + 'comment/ByChannelName/' + name)
      .subscribe(comments => {
        this.comments = comments.map(
          comment => {
            comment.comment = comment.text
            return comment;
          });

        //console.log(this.comments.slice());
        this.commentsChanged.next(this.comments.slice());
      });
  }

  getComments() {
    return this.comments.slice();
  }

  addComment(channelName: string, channelId: number, author: string, comment: string) {
    var formData: any = new FormData();
    formData.append('channel_id', channelId);
    formData.append('author', author);
    formData.append('comment', comment);

    this.http.post<CommentChat[]>(
      this.BASE_URL + 'comment',
      formData)
      .subscribe(comment => {
        //this.fetchComments(channelName);
      });

  }
}
