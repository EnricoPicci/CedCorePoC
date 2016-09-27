import { Component, OnInit, Inject } from '@angular/core';

import {SessionService} from '../session.service';

import {RemoteServicesInterface} from '../../remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../../remote-services-interface/remote-services.token';
import {Customer} from '../../model/customer';

@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css']
})
export class CustomerSummaryComponent implements OnInit {
  searchMode = false;
  customer: Customer;
  rapportoId: string;

  constructor(
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    let goToRemoteServer = (this.session.customerId != null && this.session.getCustomer() == null) ||
                            (this.session.getCustomer() != null && 
                                this.session.getCustomer().customerId != this.session.customerId);
    if (goToRemoteServer) {
      this.getCustomerFromRemoteServer(this.session.customerId);
    } else {
      if (this.session.getCustomer()) {
        this.setCustomerForView(this.session.getCustomer());
      } else {
        this.setSearchMode();
      }
    }
  }

  search() {
    if (!this.searchMode) {
      this.setSearchMode();
    } else {
      this.getCustomerFromRemoteServer(null, this.customer.cognome);
      this.disableSearchMode();
    }
  }
  setSearchMode() {
    this.searchMode = true;
    this.customer = <Customer>{};
  }
  disableSearchMode() {
    this.searchMode = false;
    this.customer = this.session.getCustomer();
  }

  getCustomerFromRemoteServer(id?: string, cognome?: string) {
    this.server.getCustomer(id, cognome)
      .subscribe(
        (result: Customer) => {
          this.setCustomerForView(result);
          this.session.setCustomer(this.customer);
        },
        (error) => {console.log(error)}
      )
  }
  setCustomerForView(customer: Customer) {
    this.customer = customer;
    this.rapportoId = this.customer.rapporti[0].id;
  }

}
