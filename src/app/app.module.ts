import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*
npm install --save @angular2-material/core @angular2-material/sidenav @angular2-material/toolbar 
npm install --save @angular2-material/card @angular2-material/button @angular2-material/input @angular2-material/tabs
npm install hammerjs --save
typings install dt~hammerjs --save --global
*/
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
import {MdTabsModule} from '@angular2-material/tabs/tabs';
import {MdCardModule} from '@angular2-material/card/card';
import {MdButtonModule} from '@angular2-material/button/button';
import {MdInputModule} from '@angular2-material/input/input';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders }  from './app.routing';
import { PaymentModule } from './payment/payment.module';
import { AdvComponent } from './adv/adv.component';
import { ErrorManagerComponent } from './error-manager/error-manager.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PocWelcomeComponent } from './poc-welcome/poc-welcome.component';
import {SessionService} from './session.service';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AdvComponent,
    ErrorManagerComponent,
    PageNotFoundComponent,
    PocWelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    PaymentModule,
    SharedModule,
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdTabsModule.forRoot(),
    MdCardModule.forRoot(),
    MdButtonModule.forRoot(),
    MdInputModule.forRoot()
  ],
  providers: [appRoutingProviders, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
