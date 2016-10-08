import { NgModule } from '@angular/core';

import { DynamicRoute2Component } from './dynamic-route-2.component';
import {dynamicRoute2Routing} from './dynamic-route-2.routing';

@NgModule({
  declarations: [
      DynamicRoute2Component
  ],
  imports: [
    dynamicRoute2Routing // A lazy loaded module needs to declare its own Router otherwise it gets loaded but does
                          // not know where to go
  ],
  providers: [

  ],
  bootstrap: [

  ]
})
// The 'default' keyword here is not used since I use the #DynamicRoute2Module
// in the Router configuration (see app.routing.ts)
export class DynamicRoute2Module { }
