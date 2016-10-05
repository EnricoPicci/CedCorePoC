import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders }  from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PocWelcomeComponent } from './poc-welcome/poc-welcome.component';

import { PaymentModule } from './payment/payment.module';
import {AppSharedModule} from './app-shared/app-shared.module';
import {AdvModule} from './adv/adv.module'
import {ErrorManagerModule} from '../org-shared/error-manager/error-manager.module';
import {CompUtilsModule} from '../org-shared/comp-utils/comp-utils.module';

import {RemoteServicesRestModule} from './app-shared/remote-services-rest/remote-services-rest.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PocWelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    PaymentModule,
    AdvModule,
    AppSharedModule.forRoot(),  // imported using forRoot() to ensure that the services configured by this
                                // this module for Dependency Injection are really Singletons also
                                // for modules which are lazy loaded (see AppSharedModule)
    RemoteServicesRestModule,
    ErrorManagerModule,
    CompUtilsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
