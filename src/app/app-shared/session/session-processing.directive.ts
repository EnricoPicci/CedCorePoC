import { Directive, HostBinding } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../app-shared/session/session.service';

@Directive({
  selector: '[session-processing]'
})
export class SessionProcessingDirective {
  sessionProcessingSubscription: Subscription;
  private _spinning: boolean;
  @HostBinding('class.processing-form') value1 = false;
  @HostBinding('class.processing-input') value2 = false;
  @HostBinding('disabled') value3 = false;

  constructor(private session: SessionService) { }

  ngOnInit() {
    console.log('SessionProcessingDirective subscribes to sessionProcessing');
    this.sessionProcessingSubscription = 
            this.session.sessionProcessing$.subscribe((value: boolean) => {
              this.value1 = value;
              this.value2 = value;
              this.value3 = value;
            })
  }
  ngOnDestroy() {
    console.log('SessionProcessingDirective unsubscribes to sessionProcessing');
    this.sessionProcessingSubscription.unsubscribe();
  }

}
