import { Directive, HostBinding } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../app-shared/session/session.service';

// disables elements . it is driven by change of state in the session
@Directive({
  selector: '[session-disable]'
})
export class SessionDisableDirective {
  sessionDisableSubscription: Subscription;
  @HostBinding('class.disabled-form') value1 = false;
  @HostBinding('class.disabled-input') value2 = false;
  @HostBinding('disabled') value3 = false;

  constructor(private session: SessionService) { }

  ngOnInit() {
    console.log('SessionDisableDirective subscribes to sessionDisable');
    this.sessionDisableSubscription = 
            this.session.sessionDisable$.subscribe((value: boolean) => {
              this.value1 = value;
              this.value2 = value;
              this.value3 = value;
            })
  }
  ngOnDestroy() {
    console.log('SessionDisableDirective unsubscribes to sessionDisable');
    this.sessionDisableSubscription.unsubscribe();
  }

}
