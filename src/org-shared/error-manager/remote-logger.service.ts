import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

import {ErrorLog} from './error-log';
import { environment } from '../../environments/environment';

@Injectable()
export class RemoteLoggerService {

  constructor(private http: Http) { }

  sendLog(log: ErrorLog) {
    let url = environment.loggerUrl + 'log';
    return this.http.post(url, log, this.getOptions())
                .map(this.extractData)
                .map((json) => {
                    return json;
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
