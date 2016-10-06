import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from '@angular/common'; 
import { FormsModule } from '@angular/forms';


/*
Angular2 Material packages need to be installed via npm
npm install --save @angular2-material/core @angular2-material/sidenav @angular2-material/toolbar 
npm install --save @angular2-material/card @angular2-material/button @angular2-material/input @angular2-material/tabs
npm install --save @angular2-material/icon @angular2-material/checkbox
npm install hammerjs --save
typings install dt~hammerjs --save --global
*/
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
import {MdButtonModule} from '@angular2-material/button/button';
import {PortalModule} from '@angular2-material/core/portal/portal-directives';
import {OverlayModule} from '@angular2-material/core/overlay/overlay-directives';
import {RtlModule} from '@angular2-material/core/rtl/dir';
import {MdTabsModule} from '@angular2-material/tabs/tabs';
import {MdCardModule} from '@angular2-material/card/card';
import {MdInputModule} from '@angular2-material/input/input';
import {MdTooltipModule} from '@angular2-material/tooltip/tooltip';
import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';

import {SessionService} from './session/session.service';

import { FunctionalAreaMenuComponent } from './functional-area-menu/functional-area-menu.component';
import { CustomerSummaryComponent } from './customer-summary/customer-summary.component';
import { CustomerSummaryListComponent } from './customer-summary/customer-summary-list.component';
import { IbanPipe } from './iban/iban.pipe';
import { IbanComponent } from './iban/iban.component';

import {CompUtilsModule} from '../../org-shared/comp-utils/comp-utils.module';

@NgModule({
  declarations: [
    FunctionalAreaMenuComponent, 
    CustomerSummaryComponent, 
    IbanPipe, IbanComponent, CustomerSummaryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdButtonModule.forRoot(),
    OverlayModule.forRoot(),
    PortalModule.forRoot(),
    RtlModule.forRoot(),
    MdTabsModule.forRoot(),
    MdCardModule.forRoot(),
    MdInputModule.forRoot(),
    MdTooltipModule.forRoot(),
    MdCheckboxModule.forRoot(),
    CompUtilsModule
  ],
  exports: [
    FunctionalAreaMenuComponent,
    CustomerSummaryComponent, CustomerSummaryListComponent,
    IbanPipe, IbanComponent,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    CommonModule,
    FormsModule,
    MdTabsModule,
    MdCardModule,
    MdInputModule,
    MdTooltipModule,
    MdCheckboxModule,
    CompUtilsModule
  ], 
  // This module can be shared also by Modules which are lazy-loaded
  // We want though to have only one instance of SessionService in the whole app (a Singleton)
  // Therefore we do not configure Dependency Injection in the standard way (i.e. using 'providers')
  // Rather we define a 'forRoot()' method that returns a ModuleWIthProviders
  //DO NOT USE THE STANDARD CONFIGURATION providers: [SessionService]
  //
  // The root app module (AppModule) imports AppSharedModule calling the forRoot() method
  // Other feature modules (whic could be lazy loaded) import AppSharedModule in the standard way (see PaymentModule)
  //
  // http://blog.angular-university.io/angular2-ngmodule/
})
export class AppSharedModule { 
  static forRoot():ModuleWithProviders {
    return {
        ngModule: AppSharedModule,
        providers: [SessionService]
    };
  }
}
