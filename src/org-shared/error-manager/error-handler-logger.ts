import { ErrorHandler, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

import {ErrorLog} from './error-log';
import {RemoteLoggerService} from './remote-logger.service';

@Injectable()
export class ErrorHandlerLogger extends ErrorHandler {
    constructor(private http: Http, private remoteLogger: RemoteLoggerService) {
        super();
     }

    handleError(error) {
        console.log('ErrorHandlerLogger');
        let errorLog = new ErrorLog();
        errorLog.message = error.message;
        errorLog.stack = error.stack;
        errorLog.timestamp = Date.now();
        console.log(errorLog);
        this.remoteLogger.sendLog(errorLog)
                .subscribe((resp) => {
                    console.log('Error Log sent to remote logger - ', resp);
                });
        super.handleError(error);
    }


}