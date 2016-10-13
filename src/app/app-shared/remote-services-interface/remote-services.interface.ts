import { Observable }     from 'rxjs/Observable';

import {Customer} from './customer.interface';
import {ValidationResponse} from './validation-response.interface';
import {Payment} from './payment.interface';
import {SubmissionResponse} from './submission-response.interface';

export interface RemoteServicesInterface {
  getCustomers(id?: string, cognome?: string): Observable<Array<Customer>>;
  adv(customerId: string): Observable<ValidationResponse>;
  getModules(): Observable<Array<any>>;
  saveContext(context: any): Observable<any>;
  sendPayment(payment: Payment): Observable<SubmissionResponse>;
  // logServiceError does not return on Observable since this is a method which clients call 
  // when they want to log an error but are not interested in elaborating the response
  logServiceError(error: any, serviceName: string): void;
}