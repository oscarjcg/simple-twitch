export class Channel {
    constructor(public id?: number,
                public name?: string,
                public image?: string,
                public imageBase64?: string,
                public preview?: string,
                public previewBase64?: string,
                public content?: string,
                public type?: number) {

    }

    static from(json) {
        return Object.assign(new Channel(), json);
      }

    getName() {
        return this.name;
    }
}

