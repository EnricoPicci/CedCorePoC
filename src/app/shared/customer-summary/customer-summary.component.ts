import { Component, OnInit, Inject } from '@angular/core';

import {SessionService} from '../session.service';

import {RemoteServicesInterface} from '../../remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../../remote-services-interface/remote-services.token';
import {Customer} from '../../remote-services-interface/customer';

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
    this.server.getCustumer(this.session.customerId)
      .subscribe(
        (result) => {
          this.customer = result;
        },
        (error) => {console.log(error)}
      )
  }

  setSearchMode() {
    this.searchMode = true;
  }

}
