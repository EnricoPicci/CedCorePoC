import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import {Customer} from '../model/customer';
import {ValidationResponse} from '../model/validation-response';

@Injectable()
export class SessionService {
  private ndg: string;
  private customer: Customer;
  public validationResponse: ValidationResponse;

  constructor() { }

  // Observable setNdg source
  private _ndg = new Subject<string>();
  // Observable string streams
  public ndg$ = this._ndg.asObservable();


  setNdg(ndg: string) {
    console.log('ndg  ', ndg);
    this.ndg = ndg;
    this._ndg.next(ndg);
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
