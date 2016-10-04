import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*
npm install --save @angular2-material/core @angular2-material/sidenav @angular2-material/toolbar 
npm install --save @angular2-material/card @angular2-material/button @angular2-material/input @angular2-material/tabs
npm install --save @angular2-material/icon @angular2-material/checkbox
npm install hammerjs --save
typings install dt~hammerjs --save --global
*/
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
//import {MdTabsModule} from '@angular2-material/tabs/tabs';
//import {MdCardModule} from '@angular2-material/card/card';
import {MdButtonModule} from '@angular2-material/button/button';
//import {MdInputModule} from '@angular2-material/input/input';
import {PortalModule} from '@angular2-material/core/portal/portal-directives';
import {OverlayModule} from '@angular2-material/core/overlay/overlay-directives';
import {RtlModule} from '@angular2-material/core/rtl/dir';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders }  from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PocWelcomeComponent } from './poc-welcome/poc-welcome.component';

import { PaymentModule } from './payment/payment.module';
import {SharedModule} from './shared/shared.module';
import {AdvModule} from './adv/adv.module'
import {RemoteServicesRestModule} from './remote-services-rest/remote-services-rest.module';
import {ErrorManagerModule} from './error-manager/error-manager.module';
import {CompUtilsModule} from './comp-utils/comp-utils.module';

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
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    //MdTabsModule.forRoot(),
    //MdCardModule.forRoot(),
    MdButtonModule.forRoot(),
    //MdInputModule.forRoot(),
    OverlayModule.forRoot(),
    PortalModule.forRoot(),
    RtlModule.forRoot(),
    PaymentModule,
    AdvModule,
    SharedModule,
    RemoteServicesRestModule,
    ErrorManagerModule,
    CompUtilsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
