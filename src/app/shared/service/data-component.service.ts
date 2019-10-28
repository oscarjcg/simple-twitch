import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataComponentService {
    heightHeader = 0;

    calculateHeightChannel() {
        return window.innerHeight - this.heightHeader;
    }

    calculateHeightChat() {
        return window.innerHeight - this.heightHeader;
    }
}
