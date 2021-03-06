import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../session/session.service';

import {RemoteServicesInterface} from '../remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../remote-services-interface/remote-services.token';
import {Customer} from '../remote-services-interface/customer.interface';

@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css'],
  inputs: ['customer', 'searchEnabled'],
  outputs: ['customersRetrieved']
})
export class CustomerSummaryComponent implements OnInit {
  searchMode = false;
  searchEnabled = true;
  customer: Customer;
  private _customer: Customer;
  rapportoId: string;
  //private ndgSubscription: Subscription;
  private customersRetrieved = new EventEmitter();

  serviceInError: string;

  constructor(
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    let sessionCustomers = this.session.getCustomers();
    if (this.customer) {
      this.setCustomerForView(this.customer);
    } else {
      this.setSearchMode();
    }
  }

  search() {
    if (!this.searchMode) {
      this.setSearchMode();
    } else {
      this.getCustomersFromRemoteServer(null, this.customer.cognome);
      this.disableSearchMode(false);
    }
  }
  setSearchMode() {
    this.searchMode = true;
    this._customer = this.customer;
    this.customer = <Customer>{};
    this.session.skipAdvValidation = false;
  }
  disableSearchMode(reset: boolean) {
    this.searchMode = false;
    if (reset) {
      this.customer = this._customer;
    }
  }

  getCustomersFromRemoteServer(ndg?: string, cognome?: string) {
    this.server.getCustomers(ndg, cognome)
      .subscribe(
        (result: Array<Customer>) => {
          if (result && result.length > 0) {
            console.log('Customer retrieved ', result[0]);
            this.setCustomerForView(result[0]);
          }
          this.customersRetrieved.next();
          this.session.setCustomers(result, ndg);
        },
        (error) => {
          this.serviceInError = 'GET CUSTOMER';
          console.log('Error in GET CUSTOMER call');
          this.server.logServiceError(error, this.serviceInError);
        }
      )
  }
  setCustomerForView(customer: Customer) {
    this.customer = customer;
    this.rapportoId = this.customer.rapporti[0].id;
  }

}
