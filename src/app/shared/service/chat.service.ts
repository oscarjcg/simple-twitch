import { Injectable } from '@angular/core';
import { CommentChat } from '../model/comment.model';
import { Subject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Channel} from "../model/channel.model";

@Injectable({providedIn: 'root'})
export class ChatService {
  private BASE_URL = 'https://backend-simple-twitch.codename-project.com/api/';


  comments: CommentChat[] = [

  ];
  commentsChanged = new Subject<CommentChat[]>();

  constructor(private http: HttpClient) {}

  fetchComments(name: string) {
    this.http.get<CommentChat[]>(this.BASE_URL + 'comments/name/' + name)
      .subscribe(comments => {
        this.comments = comments.map(
          comment => {
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
    this.http.post<CommentChat[]>(
      this.BASE_URL + 'comments',
      {channel_id: channelId, author: author, comment: comment})
      .subscribe(comment => {
        this.fetchComments(channelName);
      });

  }
}
