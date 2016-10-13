import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Subscription }    from 'rxjs/Subscription'; 

import {CompHighlightSwitchService} from './comp-highlight-switch.service';

@Directive({
  selector: '[comp-highlight]'
})
export class CompHighlightDirective {
  private _color: string;
  private switchSubscription: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer,
              private switchService: CompHighlightSwitchService) { }

  @Input('comp-highlight') set color(_color: string) {
    this._color = _color;
    this.highlight(this._color != null);
  };

  highlight(on: boolean) {
    if (on) {
      this.renderer.setElementStyle(this.el.nativeElement, 'border-width', 'thick');
      this.renderer.setElementStyle(this.el.nativeElement, 'border-style', 'solid');
      this.renderer.setElementStyle(this.el.nativeElement, 'border-color', this._color);
    } else {
      this.renderer.setElementStyle(this.el.nativeElement, 'border-style', 'none');
    }
  }

  ngOnInit() {
    this.switchSubscription = this.switchService.on$.subscribe((_on) => {
                                      this.highlight(_on);
                                    })
  }
  ngOnDestroy() {
    if (this.switchSubscription) {
      this.switchSubscription.unsubscribe();
    }
  }
  
}
