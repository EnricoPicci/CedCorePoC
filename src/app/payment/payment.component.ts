import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

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
  private ndgSubscription: Subscription;

  constructor(
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    this.ndgSubscription = this.session.ndg$.subscribe(() => {
      console.log('ids  ');
      this.server.adv(this.session.getNdg())
        .subscribe(
          (result: ValidationResponse) => {
            this.session.validationResponse = result;
            console.log(this.session.validationResponse);
          },
          (error) => {console.log(error)}
        )
    })
  }
  // it is critical to unsubscribe subscriptions when a Component is destroyed to avoid memory leaks
  // subscriptions not unsubscribed remain active when a Component is destroyed unless explicitely destroyed
  ngOnDestroy() {
    this.ndgSubscription.unsubscribe();
  }

  validationException() {
    return this.session.validationResponse != null && this.session.validationResponse.resp == 'KO'
  }

}
