import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {SessionService} from './shared/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let subscription = this.route.queryParams.subscribe((params) => {
      console.log('run the subscription one time');
      if (params['id']) {
        this.session.customerId = params['id'];
        console.log('you should not run the subscription any more');
        subscription.unsubscribe();
      }
    });
  }

  payment() {
    this.router.navigate(['/payment']);
  }
  adv() {
    this.router.navigate(['/adv']);
  }
}
