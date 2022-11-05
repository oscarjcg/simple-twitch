

export class CommentChat {
    private colors: string[] = ['red', 'blue', 'yellow', 'purple'];

    constructor(
                public id: number,
                public channel_id: number,
                public author: string,
                public comment: string,
                public text: string,
                public crated_at: string,
                public updated_at: string,
                public timeSeconds?: number,
                public color?: string) {}

    // min:sec
    getTime() {
        return (Math.floor(this.timeSeconds / 60)) + ':' + (this.timeSeconds % 60).toFixed(0);
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
