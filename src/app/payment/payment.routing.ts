import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PaymentComponent} from './payment.component';
import {PaymentHomeComponent} from './payment-home/payment-home.component';
import {SepaPaymentComponent} from './sepa-payment/sepa-payment.component';
import {MavPaymentComponent} from './mav-payment/mav-payment.component';

const appRoutes: Routes = [
    { 
        path: 'payment', component: PaymentComponent,
        children: [
            { path: '', component: PaymentHomeComponent },
            { path: 'sepa', component: SepaPaymentComponent },
            { path: 'mav', component: MavPaymentComponent }
        ]
    }
];

export const appRoutingProviders: any[] = [

];

export const paymentRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);