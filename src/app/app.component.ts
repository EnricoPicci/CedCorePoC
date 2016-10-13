import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import {SessionService} from './app-shared/session/session.service';
import {Tab} from './app-shared/functional-area-menu/tab';
import {RemoteServicesInterface} from './app-shared/remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from './app-shared/remote-services-interface/remote-services.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  moduleRoutes: Route[];
  tabs: Array<Tab>;
  private serviceInError: string;

  constructor(
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) {}

  ngOnInit() {
    let subscription = this.route.queryParams.subscribe((params) => {
      console.log('AppComponent subscribes to route.queryParams observable to retrieve the query string');
      if (params['NDG']) {
        this.session.ndg = params['NDG'];
        console.log('AppComponent unsubscribes from route.queryParams');
        // once the NDG is ready for the first time (i.e when the app is launched) the subscription
        // must be unsubscribed to avoid reading it again if you get back to the initial 'page'
        // (e.g. via browser back button)
        subscription.unsubscribe();
      }
    });

    this.server.getModules().subscribe(
      (moduleRoutes) => {this.moduleRoutes = moduleRoutes;},
      (error) => {
        this.serviceInError = 'GET MODULES';
        console.log('Error in GET MODULES call');
        this.server.logServiceError(error, this.serviceInError);
      }
    )
  }

  // before leaving the app a context object is written on a remote DB
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    // not very useful to log in beforeUnloadHander, but still ...
    console.log('AppComponent beforeUnloadHander');
    let context = {
      timestamp: Date.now(), 
      data: {ndg: this.session.getNdg()}
    };
    this.server.saveContext(context).subscribe(() => {
      console.log('AppComponent context saved ', context);
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
