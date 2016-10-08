import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DynamicRoute2Component} from './dynamic-route-2.component';

// A lazy loaded module needs to declare its own Router otherwise it gets loaded but does
// not know where to go
const dynamicRoute2Routes: Routes = [
    { 
        path: '', component: DynamicRoute2Component
    }
];

export const dynamicRoute2Routing: ModuleWithProviders = RouterModule.forChild(dynamicRoute2Routes);