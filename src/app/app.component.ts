import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {SessionService} from './shared/session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('c', params);
      this.session.customerId = params['id'];
    })
  }

  payment() {
    this.router.navigate(['/payment']);
  }
  adv() {
    this.router.navigate(['/adv']);
  }
}
