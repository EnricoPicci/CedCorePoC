import { NgModule, ErrorHandler } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';

import { ErrorManagerComponent } from './error-manager.component';
import {ErrorHandlerLogger} from './error-handler-logger';
import {RemoteLoggerService} from './remote-logger.service';

import {CompUtilsModule} from '../comp-utils/comp-utils.module';

@NgModule({
    declarations: [
        ErrorManagerComponent
    ],
    exports: [
        ErrorManagerComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        CompUtilsModule
    ],
    providers: [
        RemoteLoggerService,
        {provide: ErrorHandler, useClass: ErrorHandlerLogger}
    ]
})
export class ErrorManagerModule {}