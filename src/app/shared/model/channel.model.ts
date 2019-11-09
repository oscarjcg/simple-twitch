export class Channel {
    constructor(private name?: string,
                public image?: {
                    data: {
                        type: string,
                        data: Int8Array
                    },
                    contentType: string
                },
                public imageBase64?: string,
                public preview?: {
                    data: {
                        type: string,
                        data: Int8Array
                    },
                    contentType: string
                },
                public previewBase64?: string) {

    }

    static from(json) {
        return Object.assign(new Channel(), json);
      }

    getName() {
        return this.name;
    }
}

