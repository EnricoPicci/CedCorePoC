import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PaymentComponent} from './payment.component';
import {PaymentHomeComponent} from './payment-home/payment-home.component';
import {SepaPaymentComponent} from './sepa-payment/sepa-payment.component';
import {DDPaymentComponent} from './dd-payment/dd-payment.component';

// The router of PaymentModule is configured using the 'children' key
// This is required since PaymentComponent contains in itself a RouterOutlet
// Such configuration ensures that if the path './payment/sepa' is requested
// first Angular loads PaymentComponent and then loads SepaPaymentComponent
// in the RouterOutlet of PaymentComponent
// (see AppRouting to see the configuration of the top level Router where 'payment' path is defined)
const paymentRoutes: Routes = [
    { 
        path: '', component: PaymentComponent,
        children: [
            { path: '', component: PaymentHomeComponent },
            { path: 'sepa', component: SepaPaymentComponent },
            { path: 'dd', component: DDPaymentComponent }
        ]
    }
];

export const appRoutingProviders: any[] = [

];

export const paymentRouting: ModuleWithProviders = RouterModule.forChild(paymentRoutes);