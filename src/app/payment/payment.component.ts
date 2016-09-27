import { Component, OnInit, Inject } from '@angular/core';

import {SessionService} from '../shared/session.service';

import {RemoteServicesInterface} from '../remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../remote-services-interface/remote-services.token';
import {ValidationResponse} from '../model/validation-response';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  tabs = [
    {id: 'sepa', label: 'SEPA', path: 'sepa'},
    {id: 'mav', label: 'MAV', path: 'mav'}
  ];

  constructor(
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    if (this.session.customerId) {
      this.server.adv(this.session.customerId)
        .subscribe(
          (result: ValidationResponse) => {
            this.session.validationResponse = result;
            console.log(this.session.validationResponse);
          },
          (error) => {console.log(error)}
        )
    }
  }

  validationException() {
    return this.session.validationResponse != null && this.session.validationResponse.resp == 'KO'
  }

}
