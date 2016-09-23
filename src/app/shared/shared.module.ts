import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; 

import {MdTabsModule} from '@angular2-material/tabs/tabs';
import {MdCardModule} from '@angular2-material/card/card';

import { FunctionalAreaMenuComponent } from './functional-area-menu/functional-area-menu.component';

@NgModule({
  declarations: [FunctionalAreaMenuComponent],
  imports: [
    CommonModule,
    MdTabsModule.forRoot(),
    MdCardModule.forRoot()
  ],
  exports: [FunctionalAreaMenuComponent],
  providers: []
})
export class SharedModule { }
