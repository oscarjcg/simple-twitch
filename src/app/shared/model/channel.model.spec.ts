import { Channel } from './channel.model';

describe('Channel', () => {
  it('from() builds a Channel instance from plain JSON', () => {
    const channel = Channel.from({ id: 3, name: 'gamer', content: 'abc' });

    expect(channel).toBeInstanceOf(Channel);
    expect(channel.id).toBe(3);
    expect(channel.content).toBe('abc');
    expect(channel.getName()).toBe('gamer');
  });
});
