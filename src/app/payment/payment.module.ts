import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; 

import { PaymentComponent } from './payment.component';
import { paymentRouting }  from './payment.routing';
import { PaymentHomeComponent } from './payment-home/payment-home.component';
import { SepaPaymentComponent } from './sepa-payment/sepa-payment.component';
import { DDPaymentComponent } from './dd-payment/dd-payment.component';
import {AppSharedModule} from '../app-shared/app-shared.module';
import { PaymentValidationExceptionComponent } from './payment-validation-exception/payment-validation-exception.component';
import {ErrorManagerModule} from '../../org-shared/error-manager/error-manager.module';

// This module is lazy loaded, i.e. is loaded only when required by the main app and not at bootstrap
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
    paymentRouting,  // the routing within this module is defined by the module itself
    AppSharedModule,  // imported in the standard way as opposed to how it is imported by AppModule
    ErrorManagerModule
  ],
  providers: []
})
// The default keyword is necessary to enable lazy loading
export default class PaymentModule { }
