import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import {MdTabsModule} from '@angular2-material/tabs/tabs';
import {MdCardModule} from '@angular2-material/card/card';
import {MdInputModule} from '@angular2-material/input/input';
import {MdTooltipModule} from '@angular2-material/tooltip/tooltip';
import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';

import {SessionService} from './session/session.service';

import { FunctionalAreaMenuComponent } from './functional-area-menu/functional-area-menu.component';
import { CustomerSummaryComponent } from './customer-summary/customer-summary.component';

import { IbanPipe } from './iban/iban.pipe';
import { IbanComponent } from './iban/iban.component';

import {CompUtilsModule} from '../comp-utils/comp-utils.module';

@NgModule({
  declarations: [
    FunctionalAreaMenuComponent, 
    CustomerSummaryComponent, 
    IbanPipe, IbanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MdTabsModule.forRoot(),
    MdCardModule.forRoot(),
    MdInputModule.forRoot(),
    MdTooltipModule.forRoot(),
    MdCheckboxModule.forRoot(),
    CompUtilsModule
  ],
  exports: [
    FunctionalAreaMenuComponent,
    CustomerSummaryComponent,
    IbanPipe, IbanComponent,
    CommonModule,
    FormsModule,
    MdTabsModule,
    MdCardModule,
    MdInputModule,
    MdTooltipModule,
    MdCheckboxModule,
    CompUtilsModule
  ],
  providers: [SessionService]
})
export class SharedModule { }
