import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders }  from './app.routing';
import { PaymentModule } from './payment/payment.module';
import { AdvComponent } from './adv/adv.component';
import { ErrorManagerComponent } from './error-manager/error-manager.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PocWelcomeComponent } from './poc-welcome/poc-welcome.component';

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
    PaymentModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
