import { NgModule, ErrorHandler } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';

import { ErrorManagerComponent } from './error-manager.component';
import {ErrorHandlerLogger} from './error-handler-logger';
import {RemoteLoggerService} from './remote-logger.service';
//import {UnhandledErrorComponent} from './unhandled-error.component';

//import {errorManagerRouting} from './error-manager.routing';

@NgModule({
    declarations: [
        ErrorManagerComponent,
        //UnhandledErrorComponent
    ],
    exports: [
        ErrorManagerComponent
    ],
    imports: [
        CommonModule,
        HttpModule
        //errorManagerRouting 
    ],
    providers: [
        RemoteLoggerService,
        {provide: ErrorHandler, useClass: ErrorHandlerLogger}
    ]
})
export class ErrorManagerModule {}