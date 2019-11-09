export class Category {
    constructor(public name: string,
                public imageBase64: string,
                public image?: {
                    data: {
                        type: string,
                        data: Int8Array
                    },
                    contentType: string
                }) {

    }
}
