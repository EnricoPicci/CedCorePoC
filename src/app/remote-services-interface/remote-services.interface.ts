import { Observable }     from 'rxjs/Observable';

import {Customer} from './customer';

export interface RemoteServicesInterface {
  getCustumer(id: string): Observable<any>;
}