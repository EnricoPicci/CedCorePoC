import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import {TabList} from '../../app-shared/functional-area-menu/tab-list';
import {Customer} from '../remote-services-interface/customer';
import {ValidationResponse} from '../remote-services-interface/validation-response';

@Injectable()
export class SessionService {
  // SessionService publishes the event of change of NDG and notiefies the
  // subscribers when NDG changes 
  public ndg: string;
  private _ndg = new BehaviorSubject<string>(null);  // The fist value emitted by the Observable is null
  public ndg$ = this._ndg.asObservable();  // the trailing $ is a convention for observable
  // SessionService is used to notify FunctionalAreaMenuComponent that new tabs have to be loaded
  // Use the updateTabs() method to fire the notification event
  private _tabs = new BehaviorSubject<TabList>(null);
  public tabs$ = this._tabs.asObservable();

  private customers: Array<Customer>;
  public validationResponse: ValidationResponse;

  constructor() { }

  // updateNdg is used if a Component wants to signal that something may have happened to the customer
  // the subscribers to the ndg$ observable can react accordingly
  // used by ADV to signal to Payment that something has changed so that Payment can run again the checks
  public updateNdg() {
    this._ndg.next(this.ndg);
  }
  public getNdg() {
    return this.ndg;
  }
  public setCustomers(customers: Array<Customer>) {
    this.customers = customers;
    if (customers) {
      this.setNdg(customers[0].ndg);
    } else {
      this.setNdg(null);
    }
  }
  public getCustomers() {
    return this.customers;
  }
  private setNdg(ndg: string) {
    console.log('ndg  ', ndg);
    if (this.ndg && this.ndg !== ndg) {
      this.customers = null;
    }
    this.ndg = ndg;
    this._ndg.next(ndg);
  }

  // use updateTabs() to fire the notification that tabs have changed
  public updateTabs(tabs: TabList) {
    this._tabs.next(tabs);
  }
}
