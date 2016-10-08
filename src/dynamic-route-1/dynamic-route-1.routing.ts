import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DynamicRoute1Component} from './dynamic-route-1.component';

// A lazy loaded module needs to declare its own Router otherwise it gets loaded but does
// not know where to go
const dynamicRoute1Routes: Routes = [
    { 
        path: '', component: DynamicRoute1Component
    }
];

export const dynamicRoute1Routing: ModuleWithProviders = RouterModule.forChild(dynamicRoute1Routes);