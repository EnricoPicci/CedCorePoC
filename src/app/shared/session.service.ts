import { Injectable } from '@angular/core';

import {Customer} from '../model/customer';

@Injectable()
export class SessionService {
  customerId = "123";
  customer: Customer;

  constructor() { }

}
