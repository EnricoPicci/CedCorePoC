import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders }  from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PocWelcomeComponent } from './poc-welcome/poc-welcome.component';

import {AppSharedModule} from './app-shared/app-shared.module';
import {AdvModule} from './adv/adv.module';
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
    routing,  // the main routing configuration is loaded by the root module (i.e. this module)
    AdvModule,
    AppSharedModule.forRoot(),  // imported using forRoot() to ensure that the services configured by this
                                // this module for Dependency Injection are really Singletons also
                                // for modules which are lazy loaded (see AppSharedModule)
    RemoteServicesRestModule,
    ErrorManagerModule,
    CompUtilsModule.forRoot()  // imported using forRoot() for the same reason as above
                                // It is critical that forRoot() is called only in theAppModule
                                // to make sure that PaymentModule (which is lazy loaded)
                                // uses the same services provided by DI at the root app level.
                                // If CompUtilsModule.forRoot() is called in the AppSharedModule import
                                // declaration (rather than in the AppModule as here), 
                                // then 2 instances of the services provided by CompUtilsModule
                                // are created: one when AppSharedModule is loaded by the AppModule
                                // and the second when AppSharedModule is loaded by PaymentModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
