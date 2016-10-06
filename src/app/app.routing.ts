import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PocWelcomeComponent} from './poc-welcome/poc-welcome.component';
import {AdvComponent} from './adv/adv.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

// the 'payment' path is configured using loadChildren (which points a module, not to a Component)
// in order to be able to use lazy loading of the PaymentModule.
// The PaymentModule is therefore compiled into a separate .js file (such files are named chunks)
// and gets loaded only the first time it is required by the App (i.e. when the 'payment' path is
// requested by the app)
//
// https://vsavkin.com/angular-router-declarative-lazy-loading-7071d1f203ee#.ru7u3lx7w
// https://github.com/angular/angular-cli/issues/2112
// http://blog.angular-university.io/angular2-ngmodule/
const appRoutes: Routes = [
    { path: '', component: PocWelcomeComponent },
    { path: 'payment', loadChildren: 'app/payment/payment.module' },
    { path: 'adv', component: AdvComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);