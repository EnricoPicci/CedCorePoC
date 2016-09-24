import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; 

import {MdTabsModule} from '@angular2-material/tabs/tabs';
import {MdCardModule} from '@angular2-material/card/card';
import {MdInputModule} from '@angular2-material/input/input';
import {MdTooltipModule} from '@angular2-material/tooltip/tooltip';

import { FunctionalAreaMenuComponent } from './functional-area-menu/functional-area-menu.component';
import { CustomerSummaryComponent } from './customer-summary/customer-summary.component';

import {SessionService} from './session.service';
import {ConfigurationService} from './configuration.service';

@NgModule({
  declarations: [
    FunctionalAreaMenuComponent, 
    CustomerSummaryComponent
  ], 
  imports: [
    CommonModule,
    MdTabsModule.forRoot(),
    MdCardModule.forRoot(),
    MdInputModule.forRoot(),
    MdTooltipModule.forRoot()
  ],
  exports: [
    FunctionalAreaMenuComponent,
    CustomerSummaryComponent
  ],
  providers: [SessionService, ConfigurationService]
})
export class SharedModule { }
