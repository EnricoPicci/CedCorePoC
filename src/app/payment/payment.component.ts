import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.ndgSubscription = this.session.ndg$.subscribe((ndg) => {
      console.log('ids  ', ndg);
      if (ndg) {
        this.server.adv(ndg)
          .subscribe(
            (result: ValidationResponse) => {
              this.session.validationResponse = result;
              console.log(this.session.validationResponse);
            },
            (error) => {console.log(error)}
          )
      }
    });
    let selectedTabIndex: number;
    let parentPath = this.route.parent.routeConfig.path;
    console.log('Payment parent route path ', parentPath);
    if (this.route.firstChild) {
      let path = this.route.firstChild.routeConfig.path;
      console.log('Path requested to the Router of this PaymentComponent ', path);
      // http://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
      selectedTabIndex = this.tabs.findIndex(x => x.path == path);
    }
    let tabList = new TabList();
    tabList.tabs = this.tabs;
    tabList.selectedTabIndex = selectedTabIndex;
    tabList.parentPath = parentPath;
    // the Component notifies its Tabs to the session so that the FunctionalAreaMenu can
    // receive the tabs that it has to show
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
