

export class CommentChat {
    private colors: string[] = ['red', 'blue', 'yellow', 'purple'];

    constructor(public username: string,
                public comment: string,
                public timeSeconds: number,
                public color?: string) {}

    // min:sec
    getTime() {
        return (Math.floor(this.timeSeconds / 60)) + ':' + (this.timeSeconds % 60);
    }

    getColor() {
        if (this.color) {
            return this.color;
        } else {
            return this.setRandomColor();
        }
    }

    private setRandomColor() {
        this.color = this.colors[Math.round(Math.random() * this.colors.length)];
        return this.color;
    }
}
