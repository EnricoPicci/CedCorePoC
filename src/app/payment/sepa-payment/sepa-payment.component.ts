import { Component, OnInit } from '@angular/core';

import {SessionService} from '../../app-shared/session/session.service';

@Component({
  selector: 'app-sepa-payment',
  templateUrl: './sepa-payment.component.html',
  styleUrls: ['./sepa-payment.component.css']
})
export class SepaPaymentComponent implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  submitPayment() {
    console.log('Payment submitted');
  }

}
