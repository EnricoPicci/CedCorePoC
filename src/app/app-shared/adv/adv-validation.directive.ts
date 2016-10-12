import { Directive, ElementRef, Renderer, HostBinding  } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../app-shared/session/session.service';

@Directive({
  selector: '[adv-validation]'
})
export class AdvValidationDirective {
  advValidationExceptionSubscription: Subscription;
  @HostBinding('class.disabled-form') validationException1 = false;
  @HostBinding('class.disabled-input') validationException2 = false;
  @HostBinding('disabled') validationException3 = false;

  constructor(private el: ElementRef, 
              private renderer: Renderer,
              private session: SessionService) { }

  ngOnInit() {
    console.log('AdvValidationDirective subscribes to advValidationResponse');
    this.advValidationExceptionSubscription = 
            this.session.advValidationResponse$.subscribe((resp) => {
              this.validationException1 = this.session.isAdvValidationException();
              this.validationException2 = this.session.isAdvValidationException();
              this.validationException3 = this.session.isAdvValidationException();
            })
  }
  ngOnDestroy() {
    console.log('AdvValidationDirective unsubscribes to advValidationResponse');
    this.advValidationExceptionSubscription.unsubscribe();
  }

}
