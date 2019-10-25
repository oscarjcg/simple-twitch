import { Injectable } from '@angular/core';
import { CommentChat } from '../model/comment.model';

@Injectable({providedIn: 'root'})
export class ChatService {
    comments: CommentChat[] = [
        new CommentChat('user', 'First comment', 2),
        new CommentChat('user', 'Second comment ------------------------------------------', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment', 4),
        new CommentChat('user', 'Second comment ----------------------------------------------', 4),
        new CommentChat('user', 'Thirth comment', 5)
    ];

    getComments() {
        return this.comments.slice();
    }
}
