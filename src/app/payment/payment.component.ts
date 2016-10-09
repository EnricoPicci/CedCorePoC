import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Subscription }    from 'rxjs/Subscription';

import {SessionService} from '../app-shared/session/session.service';
import {Tab} from '../app-shared/functional-area-menu/tab';
import {TabList} from '../app-shared/functional-area-menu/tab-list';
import {RemoteServicesInterface} from '../app-shared/remote-services-interface/remote-services.interface';
import {REMOTE_SERVICE_INTERFACE} from '../app-shared/remote-services-interface/remote-services.token';
import {ValidationResponse} from '../app-shared/remote-services-interface/validation-response';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  tabs: Array<Tab> = [
    <Tab>{id: 'sepa', label: 'SEPA', path: 'sepa'},
    <Tab>{id: 'dd', label: 'DD', path: 'dd'}
  ];
  private ndgSubscription: Subscription;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private session: SessionService,
    @Inject(REMOTE_SERVICE_INTERFACE) private server: RemoteServicesInterface
  ) { }

  ngOnInit() {
    // it the NDG changes than this component needs to invoke the validation service
    // in order to understand if the customer can actually perform payments
    console.log('PaymentComponent subscribes to ndg$  ');
    this.ndgSubscription = this.session.ndg$.subscribe((ndg) => {
      console.log('PaymentComponent subscription to ndg$ fired with ndg: ', ndg);
      if (ndg) {
        this.server.adv(ndg)
          .subscribe(
            (result: ValidationResponse) => {
              this.session.validationResponse = result;
              console.log('Validation service response: ', this.session.validationResponse);
            },
            (error) => {console.log(error)}
          )
      }
    });
    // *********************************************************************************************
    // in this block of code the Component prepares the data required by FunctionalAreaMenuComponent
    // to create the dynamic menu and execute correctly the navigation commands
    let selectedTabIndex: number;
    // this component asks to the parent roor which is the path used to reach itself
    // this component does not know the configution used to reach the component itself
    let parentPath = this.route.parent.routeConfig.path;
    console.log('Payment parent route path ', parentPath);
    // the actual path requested is stored in the first child (if it exists) since in the router configuration
    // of PaymentModule we reach PaymentComponent matching the path '' and then we load the child path
    // into the router-outlet defined in the template of PaymentComponent
    if (this.route.firstChild) {
      let path = this.route.firstChild.routeConfig.path;
      console.log('Path requested to the Router of this PaymentComponent ', path);
      // based on the path requested we identify the index of the selected tab
      // http://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
      selectedTabIndex = this.tabs.findIndex(x => x.path == path);
    }
    // tabList is an object that contains all the data required by FunctionalAreaMenuComponent to
    // show all the tabs that need to be shown and execute the navigation when requested
    let tabList = new TabList();
    tabList.tabs = this.tabs;
    tabList.selectedTabIndex = selectedTabIndex;
    tabList.parentPath = parentPath;
    // the Component notifies its Tabs to the session so that the FunctionalAreaMenuComponent can
    // receive the information required to show the tabs and execute navigation commands
    this.session.updateTabs(tabList);
  }
  // it is critical to unsubscribe subscriptions when a Component is destroyed to avoid memory leaks
  // subscriptions not unsubscribed remain active when a Component is destroyed unless explicitely destroyed
  ngOnDestroy() {
    this.ndgSubscription.unsubscribe();
  }

  validationException() {
    return this.session.validationResponse != null && this.session.validationResponse.resp == 'KO'
  }

}
