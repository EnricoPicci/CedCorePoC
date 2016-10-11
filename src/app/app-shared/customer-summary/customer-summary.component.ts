import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../session/session.service';

import {RemoteServicesInterface} from '../remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../remote-services-interface/remote-services.token';
import {Customer} from '../remote-services-interface/customer';

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
    //let sessionNdg = this.session.getNdg();
    let sessionCustomers = this.session.getCustomers();
    //let goToRemoteServer = (sessionNdg && !sessionCustomers)  // the session holds an ndg but not a customer
    /*let goToRemoteServer = (this.session.getNdg() != null && this.session.getCustomer() == null) ||
                            (this.session.getCustomer() != null && 
                                this.session.getCustomer().ndg != this.session.getNdg());*/
    //if (goToRemoteServer) {
      //this.getCustomersFromRemoteServer(this.session.getNdg());
    //} else {
      if (this.customer) {
        this.setCustomerForView(this.customer);
      } else {
        this.setSearchMode();
      }
   // }
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
      this.getCustomersFromRemoteServer(null, this.customer.cognome);
      this.disableSearchMode();
    }
  }
  setSearchMode() {
    this.searchMode = true;
    this._customer = this.customer;
    this.customer = <Customer>{};
  }
  disableSearchMode() {
    this.searchMode = false;
    this.customer = this._customer;
  }

  getCustomersFromRemoteServer(ndg?: string, cognome?: string) {
    this.server.getCustomers(ndg, cognome)
      .subscribe(
        (result: Array<Customer>) => {
          if (result && result.length > 0) {
            this.setCustomerForView(result[0]);
          }
          this.customersRetrieved.next();
          this.session.setCustomers(result, ndg);

        },
        (error) => {console.log(error)}
      )
  }
  setCustomerForView(customer: Customer) {
    this.customer = customer;
    this.rapportoId = this.customer.rapporti[0].id;
  }

}
