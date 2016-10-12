import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription'; 

import {CompHighlightSwitchService} from './comp-highlight-switch.service';

@Directive({
  selector: '[comp-highlight-title]'
})
export class CompHighlightTitleDirective {
  private switchSubscription: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer,
              private switchService: CompHighlightSwitchService) { }

  @Input('comp-highlight-title') set doNothing(stuff: string) {
  };    

  highlightTitle(show: boolean) {
    if (show) {
        this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
    } else {
        this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  ngOnInit() {
    this.switchSubscription = this.switchService.on$.subscribe((_on) => {
                                      this.highlightTitle(_on);
                                    })
  }
  ngOnDestroy() {
    if (this.switchSubscription) {
      this.switchSubscription.unsubscribe();
    }
  }
  
}
