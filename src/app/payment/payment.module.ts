//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PaymentComponent } from './payment.component';
import { paymentRouting }  from './payment.routing';
import { PaymentHomeComponent } from './payment-home/payment-home.component';
import { SepaPaymentComponent } from './sepa-payment/sepa-payment.component';
import { MavPaymentComponent } from './mav-payment/mav-payment.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentHomeComponent,
    SepaPaymentComponent,
    MavPaymentComponent
  ],
  imports: [
    paymentRouting,
    SharedModule
  ],
  providers: []
})
export class PaymentModule { }