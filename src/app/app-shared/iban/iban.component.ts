import { Component, OnInit, EventEmitter } from '@angular/core';

import {SessionService} from '../../app-shared/session/session.service';
import {Iban} from './iban';

@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.css'],
  outputs: ['validIbanChanged'],
  inputs: ['iban']
})
export class IbanComponent implements OnInit {
  iban: string;
  ibanLength = 27;
  validIbanChanged = new EventEmitter<string>();

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  onKeyUp(ibanValue: string) {
    if (this.isValid() && ibanValue.length == this.ibanLength) {
      this._validIbanChanged(ibanValue);
    } else {
      this._validIbanChanged(null);
    }
  }
  isValid() {
    return Iban.validatePartial(this.iban);
  }
  private _validIbanChanged(value: string) {
    this.validIbanChanged.next(value);
  }

}
