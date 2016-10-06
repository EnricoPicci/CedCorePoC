import { NgModule, ModuleWithProviders } from '@angular/core';

import {CompHighlightDirective} from './comp-highlight.directive';
import {CompHighlightTitleDirective} from './comp-highlight-title.directive';
import {CompHighlightSwitchService} from './comp-highlight-switch.service';
import {CompHighlightSwitchComponent} from './comp-highlight-switch.component';

@NgModule({
  declarations: [
      CompHighlightDirective,
      CompHighlightSwitchComponent,
      CompHighlightTitleDirective
  ],
  imports: [
  ],
  exports: [
      CompHighlightDirective,
      CompHighlightSwitchComponent,
      CompHighlightTitleDirective
  ],
  providers: []
})
  // This module can be shared also by Modules which are lazy-loaded
  // We want though to have only one instance of CompHighlightSwitchService in the whole app (a Singleton)
  // Therefore we do not configure Dependency Injection in the standard way (i.e. using 'providers')
  // Rather we define a 'forRoot()' method that returns a ModuleWithProviders
  //DO NOT USE THE STANDARD CONFIGURATION providers: [CompHighlightSwitchService]
  //
  // The AppSharedModule imports CompUtilsModule calling the forRoot() method
  // Other feature modules (which could be lazy loaded) can import CompUtilsModule 
  // (either directly or indirectly through AppSharedModule) in the standard way (see PaymentModule)
  // and they can safely rely on the fact that the CompHighlightSwitchService instance provided by
  // Angular DI is always the unique singleton shared around the whole app
  //
  // http://blog.angular-university.io/angular2-ngmodule/
export class CompUtilsModule { 
    static forRoot():ModuleWithProviders {
    return {
        ngModule: CompUtilsModule,
        providers: [CompHighlightSwitchService]
    };
  }
}
