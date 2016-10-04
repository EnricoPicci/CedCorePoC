import { Component, OnInit, Inject } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../shared/session/session.service';

import {RemoteServicesInterface} from '../../remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../../remote-services-interface/remote-services.token';
import {Customer} from '../../model/customer';

@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css'],
  inputs: ['searchEnabled']
})
export class CustomerSummaryComponent implements OnInit {
  searchMode = false;
  searchEnabled = true;
  customer: Customer;
  rapportoId: string;
  private ndgSubscription: Subscription;

  constructor(
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    /*this.ndgSubscription = this.session.ndg$.subscribe((ndg) => {
      console.log('cust summary subscribe ', ndg);
      if (ndg && this.customer && (ndg != this.customer.ndg)) { // a new ndg has been pushed in the session
        this.getCustomerFromRemoteServer(ndg);
      }
    })
    if (this.session.getCustomer()) {
      this.setCustomerForView(this.session.getCustomer());
    } 
    else {
      this.setSearchMode();
    }*/
    let sessionNdg = this.session.getNdg();
    let sessionCustomer = this.session.getCustomer();
    let goToRemoteServer = (sessionNdg && !sessionCustomer)  // the session holds an ndg but not a customer
    /*let goToRemoteServer = (this.session.getNdg() != null && this.session.getCustomer() == null) ||
                            (this.session.getCustomer() != null && 
                                this.session.getCustomer().ndg != this.session.getNdg());*/
    if (goToRemoteServer) {
      this.getCustomerFromRemoteServer(this.session.getNdg());
    } else {
      if (this.session.getCustomer()) {
        this.setCustomerForView(this.session.getCustomer());
      } else {
        this.setSearchMode();
      }
    }
  }

  // it is critical to unsubscribe subscriptions when a Component is destroyed to avoid memory leaks
  // subscriptions not unsubscribed remain active when a Component is destroyed unless explicitely destroyed
  /*ngOnDestroy() {
    this.ndgSubscription.unsubscribe();
  }*/

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

  getCustomerFromRemoteServer(ndg?: string, cognome?: string) {
    this.server.getCustomer(ndg, cognome)
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
