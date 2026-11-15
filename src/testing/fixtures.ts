import { Category } from '../app/shared/model/category.model';
import { Channel } from '../app/shared/model/channel.model';
import { CommentChat } from '../app/shared/model/comment.model';

export function makeCategories(): Category[] {
  return [
    new Category('League of Legends', 'img/lol.jpg', 'img/lol.jpg'),
    new Category('Overwatch', 'img/overwatch.jpg', 'img/overwatch.jpg'),
    new Category('Apex', 'img/apex.jpg', 'img/apex.jpg'),
  ];
}

export const YOUTUBE_TYPE = 1;
export const MODEL_3D_TYPE = 2;

export function makeChannels(): Channel[] {
  return [
    new Channel(1, 'gamer', 'img/c1.jpg', 'img/c1.jpg', 'img/live.jpg', 'img/live.jpg', 'dQw4w9WgXcQ', YOUTUBE_TYPE, YOUTUBE_TYPE),
    new Channel(2, 'modeler', 'img/c2.png', 'img/c2.png', 'img/live.jpg', 'img/live.jpg', 'robot', MODEL_3D_TYPE, MODEL_3D_TYPE),
    new Channel(3, 'streamer', 'img/c3.png', 'img/c3.png', 'img/live.jpg', 'img/live.jpg', 'abc123', YOUTUBE_TYPE, YOUTUBE_TYPE),
  ];
}

export function makeComments(): CommentChat[] {
  return [
    new CommentChat(1, 1, 'alice', 'Hello!', 'Hello!', '', ''),
    new CommentChat(2, 1, 'bob', 'Nice stream', 'Nice stream', '', ''),
  ];
}
