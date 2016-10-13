import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import {TabList} from '../../app-shared/functional-area-menu/tab-list';
import {Customer} from '../remote-services-interface/customer.interface';
import {ValidationResponse} from '../remote-services-interface/validation-response.interface';

@Injectable()
export class SessionService {
  // SessionService publishes the event of change of NDG and notiefies the
  // subscribers when NDG changes 
  public ndg: string;
  private _ndg = new BehaviorSubject<string>(null);  // The fist value emitted by the Observable is null
  public ndg$ = this._ndg.asObservable();  // the trailing $ is a convention for observable
  // SessionService is used to notify FunctionalAreaMenuComponent that new tabs have to be loaded
  // Use the updateTabs() method to fire the notification event
  private _tabs = new BehaviorSubject<TabList>(null);
  public tabs$ = this._tabs.asObservable();
  // SessionService is used to notify other Components if they have to be disabled or if 
  // the app is processing something (e.g. e remote service)
  // It is used by SessionDisableDirective and SessionProcessingDirective which subscribe to the specific event.
  private sessionDisable: boolean;
  private _sessionDisable = new BehaviorSubject<boolean>(false);
  public sessionDisable$ = this._sessionDisable.asObservable();
  private sessionProcessing: boolean;
  private _sessionProcessing = new BehaviorSubject<boolean>(false);
  public sessionProcessing$ = this._sessionProcessing.asObservable();

  // SessionService is used to notify other Components if the adv validation failed
  // Use the updateAdvValidationResponse() method to fire the notification event
  private advValidationResponse: ValidationResponse;
  private _advValidationResponse = new BehaviorSubject<ValidationResponse>(null);
  public advValidationResponse$ = this._advValidationResponse.asObservable();
  public skipAdvValidation = false;

  private customers: Array<Customer>;

  constructor() { }

  // updateNdg is used if a Component wants to signal that something may have happened to the customer
  // the subscribers to the ndg$ observable can react accordingly
  // used by ADV to signal to Payment that something has changed so that Payment can run again the checks
  public updateNdg() {
    console.log('Session updateNdg  ', this.ndg);
    this._ndg.next(this.ndg);
  }
  public getNdg() {
    return this.ndg;
  }
  public setCustomers(customers: Array<Customer>, ndg: string) {
    console.log('Session set customers ', customers, ' ndg ', ndg);
    this.customers = customers;
    if (ndg && customers) {
      this.setNdg(ndg);
    } else
    if (customers) {
      this.setNdg(customers[0].ndg);
    }
    else {
      this.setNdg(null);
    }
  }
  public getCustomers() {
    return this.customers;
  }
  private setNdg(ndg: string) {
    console.log('Session setNdg  ', ndg);
    this.ndg = ndg;
    this._ndg.next(ndg);
  }

  // use updateTabs() to fire the notification that tabs have changed
  public updateTabs(tabs: TabList) {
    this._tabs.next(tabs);
  }
  public removeFunctionalAreaMenu() {
    this._tabs.next(null);
  }

  disableSession() {
    this.sessionDisable = true;
    this._sessionDisable.next(true);
  }
  enableSession() {
    this.sessionDisable = false;
    this._sessionDisable.next(false);
  }
  processing(value: boolean) {
    this.sessionProcessing = value;
    this._sessionProcessing.next(value);
  }

  updateAdvValidationResponse(validationResponse: ValidationResponse) {
    this.advValidationResponse = validationResponse;
    this._advValidationResponse.next(validationResponse);
  }
  getValidationResponse() {
    return this.advValidationResponse;
  }
  isAdvValidationException(): boolean {
    let resp = this.advValidationResponse != null && this.advValidationResponse.resp == 'KO';
    return resp;
  }
  advValidationResponseInvalid() {
    let validationResponse = <ValidationResponse>{};
    validationResponse.resp = 'KO';
    this.updateAdvValidationResponse(validationResponse);
  }
}
