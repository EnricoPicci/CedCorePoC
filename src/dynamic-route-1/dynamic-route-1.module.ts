import { NgModule } from '@angular/core';

import { DynamicRoute1Component } from './dynamic-route-1.component';
import {dynamicRoute1Routing} from './dynamic-route-1.routing';

import {AppSharedModule} from '../app/app-shared/app-shared.module';

@NgModule({
  declarations: [
      DynamicRoute1Component
  ],
  imports: [
    AppSharedModule,
    dynamicRoute1Routing // A lazy loaded module needs to declare its own Router otherwise it gets loaded but does
                          // not know where to go

  ],
  providers: [

  ],
  bootstrap: [

  ]
})
// The default keyword is necessary to enable lazy loading
export default class DynamicRoute1Module { }
