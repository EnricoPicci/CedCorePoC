import { Observable }     from 'rxjs/Observable';

import {Customer} from '../model/customer';

export interface RemoteServicesInterface {
  getCustomer(id?: string, cognome?: string): Observable<any>;
}