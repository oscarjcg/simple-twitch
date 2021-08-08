import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataComponentService {
    heightHeader = 0;

    calculateHeightNoHeader() {
        return window.innerHeight - this.heightHeader;
    }
}
