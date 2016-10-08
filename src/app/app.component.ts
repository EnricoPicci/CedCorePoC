import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import {SessionService} from './app-shared/session/session.service';
import {RemoteServicesInterface} from './app-shared/remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from './app-shared/remote-services-interface/remote-services.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  moduleRoutes: Route[];

  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) {}

  ngOnInit() {
    let subscription = this.route.queryParams.subscribe((params) => {
      console.log('run the subscription one time');
      if (params['NDG']) {
        this.session.ndg = params['NDG'];
        console.log('you should not run the subscription any more');
        // once the NDG is ready for the first time (i.e when the app is launched) the subscription
        // must be unsubscribed to avoid reading it again if you get back to the initial 'page'
        // (e.g. via browser back button)
        subscription.unsubscribe();
      }
    });

    this.server.getModules().subscribe((moduleRoutes) => {
      //this.router.resetConfig([...moduleRoutes, ...this.router.config]);
      this.moduleRoutes = moduleRoutes;
    })
  }

  payment() {
    this.router.navigate(['/payment']);
  }
  adv() {
    this.router.navigate(['/adv']);
  }
  goToRoute(route) {
    this.router.navigate([route.path]);
  }
  
  error() {
    // generate an error to test the Error Handler
    let nullString: string;
    // the nullString is null and therefore looking for the 11th char generates an error
    let noChar = nullString[10];
    console.log(noChar);
  }

}
