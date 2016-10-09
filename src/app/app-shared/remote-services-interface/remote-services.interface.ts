import { Observable }     from 'rxjs/Observable';

import {Customer} from './customer';
import {ValidationResponse} from './validation-response';

export interface RemoteServicesInterface {
  getCustomers(id?: string, cognome?: string): Observable<Array<Customer>>;
  adv(customerId: string): Observable<ValidationResponse>;
  getModules(): Observable<Array<any>>;
  saveContext(context: any): Observable<any>;
}