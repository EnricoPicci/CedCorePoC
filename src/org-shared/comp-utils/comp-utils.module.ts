import { NgModule } from '@angular/core';

import {CompHighlightDirective} from './comp-highlight.directive';
import {CompHighlightTitleDirective} from './comp-highlight-title.directive';
import {CompHighlightSwitchService} from './comp-highlight-switch.service';
import {CompHighlightSwitchComponent} from './comp-highlight-switch.component';

@NgModule({
  declarations: [
      CompHighlightDirective,
      CompHighlightSwitchComponent,
      CompHighlightTitleDirective
  ],
  imports: [
  ],
  exports: [
      CompHighlightDirective,
      CompHighlightSwitchComponent,
      CompHighlightTitleDirective
  ],
  providers: [CompHighlightSwitchService]
})
export class CompUtilsModule { }
