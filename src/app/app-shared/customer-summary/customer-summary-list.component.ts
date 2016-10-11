import { Component, OnInit, Inject } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../session/session.service';

import {RemoteServicesInterface} from '../remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../remote-services-interface/remote-services.token';
import {Customer} from '../remote-services-interface/customer';

@Component({
  selector: 'app-customer-summary-list',
  templateUrl: './customer-summary-list.component.html',
  styleUrls: ['./customer-summary-list.component.css']
})
export class CustomerSummaryListComponent implements OnInit {
  customers: Array<Customer>;
  private ndgSubscription: Subscription;

  constructor(
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    let sessionNdg = this.session.getNdg();
    let sessionCustomers = this.session.getCustomers();
    let goToRemoteServer = (sessionNdg && !sessionCustomers)  // the session holds an ndg but no customers
    if (goToRemoteServer) {
      this.getCustomersFromRemoteServer(sessionNdg);
    } 
    else if (this.session.getCustomers()) {
      this.customers = this.session.getCustomers();
    }
  }

  getCustomersFromRemoteServer(ndg?: string) {
    this.server.getCustomers(ndg)
      .subscribe(
        (result: Array<Customer>) => {
          this.customers = result;
          this.session.setCustomers(this.customers, ndg);
        },
        (error) => {console.log(error)}
      )
  }

}
