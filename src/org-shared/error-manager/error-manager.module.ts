import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ErrorManagerComponent } from './error-manager.component';
import {ErrorHandlerLogger} from './error-handler-logger';
import {RemoteLoggerService} from './remote-logger.service';

@NgModule({
    declarations: [ErrorManagerComponent],
    exports: [ErrorManagerComponent],
    imports: [
        HttpModule
    ],
    providers: [
        RemoteLoggerService,
        {provide: ErrorHandler, useClass: ErrorHandlerLogger}
    ]
})
export class ErrorManagerModule {}