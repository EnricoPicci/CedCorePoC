import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {SessionService} from './app-shared/session/session.service';

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
      if (params['NDG']) {
        // this.session.setNdg(params['NDG']);
        this.session.ndg = params['NDG'];
        console.log('you should not run the subscription any more');
        // once the NDG is ready for the first time (i.e when the app is launched) the subscription
        // must be unsubscribed to avoid reading it again if you get back to the initial 'page'
        // (e.g. via browser back button)
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
