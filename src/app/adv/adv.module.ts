import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; 

import { AdvComponent } from './adv.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AdvComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class AdvModule { }
