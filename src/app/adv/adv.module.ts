import { NgModule } from '@angular/core';

import { AdvComponent } from './adv.component';
import { DocumentComponent } from './document.component';

import {AppSharedModule} from '../app-shared/app-shared.module';

@NgModule({
  declarations: [
    AdvComponent,
    DocumentComponent
  ],
  imports: [
    AppSharedModule
  ],
  providers: []
})
export class AdvModule { }
