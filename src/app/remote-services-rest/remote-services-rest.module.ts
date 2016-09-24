import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {REMOTE_SERVICE_INTERFACE} from '../remote-services-interface/remote-services.token';
import {RemoteServicesRestService} from './remote-services-rest.service'

@NgModule({
  declarations: [
  ],
  imports: [
      HttpModule
  ],
  providers: [{ provide: REMOTE_SERVICE_INTERFACE, useClass: RemoteServicesRestService}]
})
export class RemoteServicesRestModule { }
