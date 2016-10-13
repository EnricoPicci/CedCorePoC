import { Directive, ElementRef, Renderer, HostBinding  } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../../app-shared/session/session.service';

@Directive({
  selector: '[adv-validation]'
})
export class AdvValidationDirective {
  subscription: Subscription;
  @HostBinding('class.disabled-form') disableForm = false;
  @HostBinding('class.disabled-input') disableInput = false;
  @HostBinding('disabled') disabled = false;

  constructor(private el: ElementRef, 
              private renderer: Renderer,
              private session: SessionService) { }

  ngOnInit() {
    console.log('AdvValidationDirective subscribes to advValidationResponse');
    this.subscription = 
            this.session.advValidationResponse$.subscribe((resp) => {
              let isAdvException = this.session.isAdvValidationException();
              this.disableForm = isAdvException;
              this.disableInput = isAdvException;
              this.disabled = isAdvException;
            })
  }
  ngOnDestroy() {
    console.log('AdvValidationDirective unsubscribes to advValidationResponse');
    this.subscription.unsubscribe();
  }

}
