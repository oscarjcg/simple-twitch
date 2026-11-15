import { CommentChat } from './comment.model';

describe('CommentChat', () => {
  const palette = ['red', 'blue', 'yellow', 'purple'];

  function makeComment(timeSeconds?: number, color?: string) {
    return new CommentChat(1, 1, 'alice', 'Hi', 'Hi', '', '', timeSeconds, color);
  }

  afterEach(() => vi.restoreAllMocks());

  it('formats time as min:sec', () => {
    expect(makeComment(75).getTime()).toBe('1:15');
    expect(makeComment(0).getTime()).toBe('0:0');
  });

  it('returns the preset color when there is one', () => {
    expect(makeComment(0, 'green').getColor()).toBe('green');
  });

  it('picks a random palette color once and keeps it', () => {
    const comment = makeComment();
    const first = comment.getColor();

    expect(palette).toContain(first);
    expect(comment.getColor()).toBe(first);
  });

  it.each([0, 0.5, 0.99])('never picks a color outside the palette (Math.random = %s)', value => {
    vi.spyOn(Math, 'random').mockReturnValue(value);

    expect(palette).toContain(makeComment().getColor());
  });
});
