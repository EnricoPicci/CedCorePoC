import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }    from 'rxjs/Subscription';

import {MdTabChangeEvent} from '@angular2-material/tabs/tabs';

import {SessionService} from '../session/session.service';
import {Tab} from './tab';
import {TabList} from './tab-list';

@Component({
  selector: 'app-functional-area-menu',
  templateUrl: './functional-area-menu.component.html',
  styleUrls: ['./functional-area-menu.component.css'],
  inputs: ['tabList']
})
export class FunctionalAreaMenuComponent implements OnInit, OnDestroy {
  tabs: Array<Tab>;
  path: string;
  selectedTabIndex = 0;
  private tabsSubscription: Subscription;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.session.tabs$.subscribe((tabList: TabList) => {
      if (tabList) {
        this.tabs = tabList.tabs;
        this.selectedTabIndex = tabList.selectedTabIndex;
        this.path = tabList.parentPath;
      }
    })
  }
  // it is critical to unsubscribe subscriptions when a Component is destroyed to avoid memory leaks
  // subscriptions not unsubscribed remain active when a Component is destroyed unless explicitely destroyed
  // in this case it may not be strictly necessary if FunctionalAreaMenuComponent is used only in AppComponent
  // which is the root component and therefore gets destroyed only at the end of the app
  // but it remains always a best practice (you do not know if somebody else will want to use it)
  ngOnDestroy() {
    console.log('FunctionalMenuArea unsubscribe tabs ');
    this.tabsSubscription.unsubscribe();
  }

  onTabClick(event: MdTabChangeEvent) {
    console.log('Path requested ', this.path + '/' + this.tabs[event.index].path);
    //this.router.navigate([this.tabs[event.index].path], { relativeTo: this.route });
    this.router.navigate([this.path + '/' + this.tabs[event.index].path]);
  }

}
