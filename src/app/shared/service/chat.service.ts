import { Injectable } from '@angular/core';
import { CommentChat } from '../model/comment.model';
import { Subject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Channel} from "../model/channel.model";

@Injectable({providedIn: 'root'})
export class ChatService {
  //private BASE_URL = 'http://localhost:8086/api/';
  private BASE_URL = 'https://st-dotnet.codename-project.com/api/';


  comments: CommentChat[] = [

  ];
  commentsChanged = new Subject<CommentChat[]>();

  constructor(private http: HttpClient) {}

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
