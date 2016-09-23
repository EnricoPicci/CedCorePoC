import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {SessionService} from './session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  tabs = ['aa', 'ss'];

  constructor(
    private router: Router,
    private session: SessionService
  ) {}

  payment() {
    this.router.navigate(['/payment']);
  }
  adv() {
    this.router.navigate(['/adv']);
  }
}
