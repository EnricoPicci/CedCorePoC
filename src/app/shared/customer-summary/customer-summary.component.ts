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

  constructor(
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    this.getCustomer(this.session.customerId);
  }

  search() {
    if (!this.searchMode) {
      this.setSearchMode();
    } else {
      this.getCustomer(null, this.customer.cognome);
      this.disableSearchMode();
    }
  }
  setSearchMode() {
    this.searchMode = true;
    this.customer = <Customer>{};
  }
  disableSearchMode() {
    this.searchMode = false;
    this.customer = this.session.customer;
  }

  getCustomer(id?: string, cognome?: string) {
    this.server.getCustomer(id, cognome)
      .subscribe(
        (result) => {
          this.customer = result;
          this.session.customer = this.customer;
        },
        (error) => {console.log(error)}
      )
  }

}
