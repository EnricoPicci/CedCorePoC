import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import {SessionService} from '../app-shared/session/session.service';
import {ValidationResponse} from '../app-shared/remote-services-interface/validation-response.interface';

@Component({
  selector: 'app-adv',
  templateUrl: './adv.component.html',
  styleUrls: ['./adv.component.css']
})
export class AdvComponent implements OnInit {
  docVeriefied = false;

  constructor(
    private session: SessionService,
    private location: Location) { }

  ngOnInit() {
    this.session.removeFunctionalAreaMenu();
  }

  getCustomers() {
    return this.session.getCustomers();
  }
  setDocVerified(value) {
    this.docVeriefied = value;
  }

  documentsUpdated() {
    this.session.updateAdvValidationResponse(<ValidationResponse>{resp: 'OK'});
    this.session.skipAdvValidation = this.docVeriefied;  // inserted only for demo purposes since I have no real DB update
    this.location.back();
  }

}
