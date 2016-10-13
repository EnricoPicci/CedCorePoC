import { Component, OnInit, EventEmitter } from '@angular/core';

import {Customer} from '../app-shared/remote-services-interface/customer.interface';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  inputs: ['customer'],
  outputs: ['docverified']
})
export class DocumentComponent implements OnInit {
  customer: Customer;
  verified = false;
  docverified = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  docVerified(event) {
    this.docverified.next(event.checked);
  }

}
