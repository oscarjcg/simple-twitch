import { Injectable } from '@angular/core';
import { CommentChat } from '../model/comment.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChatService {
    comments: CommentChat[] = [
        new CommentChat('user', 'First lorem ipsum dolor sit amet', 1),
        new CommentChat('user', 'Second consectetur adipiscing elit', 2.3),
        new CommentChat('user', 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 4),
        new CommentChat('user', 'Condimentum lacinia quis vel eros donec ac odio tempor orci', 4),
        new CommentChat('user', 'ltricies lacus sed turpis tincidunt id aliquet risus feugiat in', 4),
        new CommentChat('user', 'Nisl tincidunt eget nullam non nisi est sit amet facilisis', 6),
        new CommentChat('user', 'Pellentesque sit amet porttitor eget dolor morbi non arcu', 7),
        new CommentChat('user', 'Ut etiam sit amet nisl purus in', 8),
        new CommentChat('user', 'Convallis a cras semper auctor neque vitae tempus quam pellentesque', 14),
        new CommentChat('user', 'Convallis a cras semper auctor neque vitae tempus quam pellentesque', 16),
        new CommentChat('user', 'Malesuada fames ac turpis egestas maecenas pharetra convallis posuere', 20),
        new CommentChat('user', 'Erat pellentesque adipiscing commodo elit', 20),
        new CommentChat('user', 'Last Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' +
            'tempor incididunt ut labore et dolore magna aliqua. Bibendum enim facilisis gravida neque', 21)
    ];
    commentsChanged = new Subject<CommentChat[]>();

    getComments() {
        return this.comments.slice();
    }

    addComment(commentChat: CommentChat) {
        let pos = 0;
        this.comments.forEach((c, i) => {
            if (commentChat.timeSeconds > c.timeSeconds) {
                pos = i;
            }

        });
        if (pos === 0) {
        this.comments.splice(0, 0, commentChat);
        } else {
            this.comments.splice(pos + 1, 0, commentChat);
        }

        this.commentsChanged.next(this.comments.slice());
    }
}
