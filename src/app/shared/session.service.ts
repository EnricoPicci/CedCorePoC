import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import {Customer} from '../model/customer';
import {ValidationResponse} from '../model/validation-response';

@Injectable()
export class SessionService {
  public customerId: string;
  private customer: Customer;
  public validationResponse: ValidationResponse;

  constructor() { }

  // Observable customerId source
  private _customerId = new Subject<string>();
  // Observable string streams
  _customerId$ = this._customerId.asObservable();
  // event raised when customerId changes
  newCustomerId(id: string) {
      this._customerId.next(id);
  }

  setCustomer(customer: Customer) {
    this.customer = customer;
    if (customer) {
      this.customerId = customer.customerId;
    } else {
      this.customerId = null;
    }
  }
  getCustomer() {
    return this.customer;
  }

}
