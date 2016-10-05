import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PocWelcomeComponent} from './poc-welcome/poc-welcome.component';
import {AdvComponent} from './adv/adv.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: PocWelcomeComponent },
    { path: 'payment', loadChildren: 'app/payment/payment.module' },
    { path: 'adv', component: AdvComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);