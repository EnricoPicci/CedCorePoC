import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import {Customer} from '../../model/customer';
import {ValidationResponse} from '../../model/validation-response';

@Injectable()
export class SessionService {
  public ndg: string;
  private customer: Customer;
  public validationResponse: ValidationResponse;

  constructor() { }

  // Observable setNdg source
  private _ndg = new BehaviorSubject<string>(null);
  // Observable string streams
  public ndg$ = this._ndg.asObservable();


  setNdg(ndg: string) {
    console.log('ndg  ', ndg);
    if (this.ndg && this.ndg !== ndg) {
      this.customer = null;
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
  setCustomer(customer: Customer) {
    this.customer = customer;
    if (customer) {
      this.setNdg(customer.ndg);
    } else {
      this.setNdg(null);
    }
  }
  getCustomer() {
    return this.customer;
  }

}
