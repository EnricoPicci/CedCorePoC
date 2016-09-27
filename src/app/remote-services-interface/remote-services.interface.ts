import { Observable }     from 'rxjs/Observable';

import {Customer} from '../model/customer';
import {ValidationResponse} from '../model/validation-response';

export interface RemoteServicesInterface {
  getCustomer(id?: string, cognome?: string): Observable<any>;
  adv(customerId: string): Observable<ValidationResponse>;
}