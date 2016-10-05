import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; 

import { PaymentComponent } from './payment.component';
import { paymentRouting }  from './payment.routing';
import { PaymentHomeComponent } from './payment-home/payment-home.component';
import { SepaPaymentComponent } from './sepa-payment/sepa-payment.component';
import { DDPaymentComponent } from './dd-payment/dd-payment.component';
import {AppSharedModule} from '../app-shared/app-shared.module';
import { PaymentValidationExceptionComponent } from './payment-validation-exception/payment-validation-exception.component';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentHomeComponent,
    SepaPaymentComponent,
    DDPaymentComponent,
    PaymentValidationExceptionComponent
  ],
  imports: [
    CommonModule,
    paymentRouting,
    AppSharedModule  // imported in the standard way as opposed to how it is imported by AppModule
  ],
  providers: []
})
export class PaymentModule { }
