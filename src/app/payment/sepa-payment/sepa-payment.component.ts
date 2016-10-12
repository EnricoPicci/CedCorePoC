import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../app-shared/session/session.service';

@Component({
  selector: 'app-sepa-payment',
  templateUrl: './sepa-payment.component.html',
  styleUrls: ['./sepa-payment.component.css']
})
export class SepaPaymentComponent implements OnInit, OnDestroy {
  advValidationException: boolean;
  advValidationExceptionSubscription: Subscription;

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.advValidationException = this.session.isAdvValidationException();
    this.advValidationExceptionSubscription = this.session.advValidationResponse$.subscribe((validationResponse) => {
      this.advValidationException = this.session.isAdvValidationException();
    })
  }
  ngOnDestroy() {
    this.advValidationExceptionSubscription.unsubscribe();
  }

  submitPayment() {
    console.log('Payment submitted');
  }

}
