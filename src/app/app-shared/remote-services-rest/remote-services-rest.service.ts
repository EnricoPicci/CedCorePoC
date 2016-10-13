import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import './rxjs-operators';

import {RemoteServicesInterface} from '../remote-services-interface/remote-services.interface';
import {Customer} from '../remote-services-interface/customer.interface';
import {ValidationResponse} from '../remote-services-interface/validation-response.interface';
import {Payment} from '../remote-services-interface/payment.interface';
import {SubmissionResponse} from '../remote-services-interface/submission-response.interface';
import {RemoteServiceError} from '../remote-services-interface/remote-service-error.interface';
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
        let url = environment.baseServicesAdvUrl + 'adv';
        let jsonParam = {ndg: ndg};
        return this.http.post(url, jsonParam, this.getOptions())
                    .map(this.extractData)
                    .map((json) => {
                        return <ValidationResponse>json
                    })
                    .catch(this.handleError);
    }

    getModules() {
        let url = environment.baseServicesUrl + 'modules';
        return this.http.get(url, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    saveContext(context: any) {
        let url = environment.baseServicesUrl + 'context';
        return this.http.post(url, context, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    sendPayment(payment: Payment) {
        let url = environment.baseServicesUrl + 'payment';
        return this.http.post(url, payment, this.getOptions())
                    .map(this.extractData)
                    .map((json) => {
                        return <SubmissionResponse>json
                    })
                    .catch(this.handleError);
    }
    logServiceError(errorMessage: any, serviceName: string) {
        let errorJson = {
            type: 'SERVICE ERROR',
            service: serviceName,
            message: errorMessage,
            timestamp: Date.now()
        }
        let url = environment.loggerUrl + 'log';
        console.log('logServiceError ', errorJson);
        // the subscribe() method is called immediatly so that the post gets immediatly executed
        // the clients calling this method do not have to bother about the results (fire and forget pattern)
        this.http.post(url, errorJson, this.getOptions())
                    .map(this.extractData)
                    .subscribe((respData) => {console.log('Log service response ', respData)})
    }

    private getOptions() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError (error: any) {
        let errorBody = error.json();
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error ';
        let errorData = <RemoteServiceError>{
            status: error.status,
            message: errMsg,
            body: errorBody
        }
        console.error('handleError ', errorData); 
        return Observable.throw(errorData);
    }
}