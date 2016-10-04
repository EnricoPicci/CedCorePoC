import { Component, OnInit } from '@angular/core';

import {CompHighlightSwitchService} from './comp-highlight-switch.service';

@Component({
  selector: 'comp-highlight-switch',
  templateUrl: './comp-highlight-switch.component.html',
  styleUrls: ['./comp-highlight-switch.component.css'],
  inputs: ['on']
})
export class CompHighlightSwitchComponent implements OnInit {
  public on: boolean;

  constructor(private switchService: CompHighlightSwitchService) { }

  ngOnInit() {
  }

  switch() {
    this.switchService.switch();
  }

  buttonText() {
    let text = 'CompHighlightOff';
    if (this.switchService.isOn()) {
      text = 'CompHighlightOn';
    }
    return text;
  }

}
