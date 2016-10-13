import { Directive, HostBinding } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../app-shared/session/session.service';

@Directive({
  selector: '[session-processing-spinning]'
})
export class SessionProcessingSpinningDirective {
  subscription: Subscription;
  @HostBinding('class.loader') spinning = false;

  constructor(private session: SessionService) { }

  ngOnInit() {
    console.log('SessionProcessingSpinningDirective subscribes to sessionProcessing');
    this.subscription = 
            this.session.sessionProcessing$.subscribe((value: boolean) => {
              this.spinning = value;
            })
  }
  ngOnDestroy() {
    console.log('SessionProcessingSpinningDirective unsubscribes to sessionProcessing');
    this.subscription.unsubscribe();
  }

}
