import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class CompHighlightSwitchService {
    private _on = true;
    // Observable _on source
    private _onSubj = new BehaviorSubject<boolean>(this._on);
    // Observable boolean stream
    public on$ = this._onSubj.asObservable();

    constructor() { }

    public on() {
        this._on = true;
        this.fireEvent();
    }
    public off() {
        this._on = false;
        this.fireEvent();
    }
    public switch() {
        this._on = !this._on;
        this.fireEvent();
    }
    private fireEvent() {
        this._onSubj.next(this._on);
    }
    public isOn() {
        return this._on;
    }

}
