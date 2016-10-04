import { NgModule } from '@angular/core';

import { AdvComponent } from './adv.component';
import { DocumentComponent } from './document.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AdvComponent,
    DocumentComponent
  ],
  imports: [
    SharedModule
  ],
  providers: []
})
export class AdvModule { }
