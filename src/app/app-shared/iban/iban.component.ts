import { Component, OnInit } from '@angular/core';

import {Iban} from './iban';

@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.css']
})
export class IbanComponent implements OnInit {
  valid = true;

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(ibanValue) {
    this.valid = Iban.validatePartial(ibanValue);
  }

}
