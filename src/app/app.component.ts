import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {SessionService} from './shared/session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customerId = "123"

  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.session.customerId = this.customerId;
    console.log(this.route)
  }

  payment() {
    this.router.navigate(['/payment']);
  }
  adv() {
    this.router.navigate(['/adv']);
  }
}
