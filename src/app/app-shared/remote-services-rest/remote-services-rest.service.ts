import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

import {RemoteServicesInterface} from '../remote-services-interface/remote-services.interface';
import {Customer} from '../remote-services-interface/customer';
import {ValidationResponse} from '../remote-services-interface/validation-response';
import { environment } from '../../../environments/environment';

@Injectable()
export class RemoteServicesRestService implements RemoteServicesInterface {

    constructor(
        private http: Http
    ) { }

    getCustomers(ndg?: string, cognome?: string) {
        let url = environment.baseServicesUrl + 'customer';
        let jsonParam = {ndg: ndg, cognome: cognome};
        return this.http.post(url, jsonParam, this.getOptions())
                    .map(this.extractData)
                    .map((customerJsons) => {
                        let customers = new Array<Customer>();
                        customerJsons.forEach((customerJson) => {
                            customers.push(<Customer>customerJson);
                        })
                        return customers
                    })
                    .catch(this.handleError);
    }

    adv(ndg: string) {
        let url = environment.baseServicesUrl + 'adv';
        let jsonParam = {ndg: ndg};
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
        return body || [];
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error ';
        console.error(errMsg); 
        return Observable.throw(errMsg);
    }
}