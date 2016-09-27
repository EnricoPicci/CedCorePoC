import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

import {RemoteServicesInterface} from '../remote-services-interface/remote-services.interface';
import {Customer} from '../model/customer';
import {ValidationResponse} from '../model/validation-response';
import {ConfigurationService} from '../shared/configuration.service';

@Injectable()
export class RemoteServicesRestService implements RemoteServicesInterface {

    constructor(
        private http: Http,
        private configuration: ConfigurationService
    ) { }

    getCustomer(id?: string, cognome?: string) {
        let url = this.configuration.baseServicesUrl + 'customer';
        let jsonParam = {id: id, cognome: cognome};
        return this.http.post(url, jsonParam, this.getOptions())
                    .map(this.extractData)
                    .map((json) => {
                        return <Customer>json
                    })
                    .catch(this.handleError);
    }

    adv(customerId: string) {
        let url = this.configuration.baseServicesUrl + 'adv';
        let jsonParam = {customerId: customerId};
        return this.http.post(url, jsonParam, this.getOptions())
                    .map(this.extractData)
                    .map((json) => {
                        return <ValidationResponse>json
                    })
                    .catch(this.handleError);
    }

    private getOptions() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); 
        return Observable.throw(errMsg);
    }
}