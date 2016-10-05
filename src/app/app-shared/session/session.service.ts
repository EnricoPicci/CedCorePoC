import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import {Customer} from '../remote-services-interface/customer';
import {ValidationResponse} from '../remote-services-interface/validation-response';

@Injectable()
export class SessionService {
  public ndg: string;
  private customers: Array<Customer>;
  public validationResponse: ValidationResponse;

  constructor() { }

  // Observable setNdg source
  private _ndg = new BehaviorSubject<string>(null);
  // Observable string streams
  public ndg$ = this._ndg.asObservable();


  setNdg(ndg: string) {
    console.log('ndg  ', ndg);
    if (this.ndg && this.ndg !== ndg) {
      this.customers = null;
    }
    this.ndg = ndg;
    this._ndg.next(ndg);
  }
  // updateNdg is used if a Component wants to signal that something may have happened to the customer
  // the subscribers to the ndg$ observable can react accordingly
  // used by ADV to signal to Payment that something has changed so that Payment can run again the checks
  updateNdg() {
    this._ndg.next(this.ndg);
  }
  getNdg() {
    return this.ndg;
  }
  setCustomers(customers: Array<Customer>) {
    this.customers = customers;
    if (customers) {
      this.setNdg(customers[0].ndg);
    } else {
      this.setNdg(null);
    }
  }
  getCustomers() {
    return this.customers;
  }

}
