import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../app-shared/session/session.service';
import {RemoteServicesInterface} from '../../app-shared/remote-services-interface/remote-services.interface';
import {Payment} from '../../app-shared/remote-services-interface/payment.interface';
import {SubmissionResponse} from '../../app-shared/remote-services-interface/submission-response.interface';
import {RemoteServiceError} from '../../app-shared/remote-services-interface/remote-service-error.interface';
import {REMOTE_SERVICE_INTERFACE} from '../../app-shared/remote-services-interface/remote-services.token';

@Component({
  selector: 'app-sepa-payment',
  templateUrl: './sepa-payment.component.html',
  styleUrls: ['./sepa-payment.component.css']
})
export class SepaPaymentComponent implements OnInit, OnDestroy {
  payment: Payment;
  advValidationException: boolean;
  advValidationExceptionSubscription: Subscription;
  serviceInError: string;
  errorMessage: string;
  submitOKMessage: string;
  disableInput = false;

  constructor(private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface) { }

  ngOnInit() {
    this.reset();
    this.advValidationException = this.session.isAdvValidationException();
    this.advValidationExceptionSubscription = this.session.advValidationResponse$.subscribe((validationResponse) => {
      this.advValidationException = this.session.isAdvValidationException();
    })
  }
  ngOnDestroy() {
    this.advValidationExceptionSubscription.unsubscribe();
  }

  setBeneficiary(value: string) {
    this.payment.beneficiary = value;
  }
  setAmount(value: string) {
    this.payment.amount = value;
  }
  setIban(value: string) {
    console.log('iban ', value);
    this.payment.iban = value;
  }
  paymentDataComplete() {
    let amountPositive = +this.payment.amount > 0
    let beneficiaryNotNull = this.payment.beneficiary != null;
    let ibanNotNull = this.payment.iban != null;
    return amountPositive && beneficiaryNotNull && ibanNotNull;
  }

  submitPayment() {
    this.session.processing(true);
    this.session.disableSession();
    this.server.sendPayment(this.payment).subscribe(
            (result: SubmissionResponse) => {
              this.session.processing(false);
              console.log('Payment submitted ', result);
              this.submitOKMessage = 'Pagamento registrato';
            },
            (error: RemoteServiceError) => {
              this.session.processing(false);
              if (error.status == 499) {
                this.errorMessage = 'Il pagamento non sappiamo se è stato processato - devi guardare sui pending';
              } else {
                this.serviceInError = 'SEND PAYMENT';
              }
              console.log('Error in SEND PAYMENT call');
              this.server.logServiceError(error, 'SEND PAYMENT');
            }
          )
  }

  reset() {
    this.payment = <Payment>{};
    this.errorMessage = null;
    this.serviceInError = null;
    this.submitOKMessage = null;
    this.session.enableSession();
  }

}
