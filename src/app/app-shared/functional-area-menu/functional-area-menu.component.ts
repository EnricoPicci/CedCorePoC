import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {MdTabChangeEvent} from '@angular2-material/tabs/tabs';

@Component({
  selector: 'app-functional-area-menu',
  templateUrl: './functional-area-menu.component.html',
  styleUrls: ['./functional-area-menu.component.css'],
  inputs: ['tabs']
})
export class FunctionalAreaMenuComponent implements OnInit {
  tabs: Array<{id: string, label: string, path: string}>;
  selectedTabIndex = 0;;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route);
    console.log(this.route.children[0].routeConfig.path);
    let path = this.route.children[0].routeConfig.path;
    if (path) {
      // http://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
      this.selectedTabIndex = this.tabs.findIndex(x => x.path == path);
    }
  }

  onTabClick(event: MdTabChangeEvent) {
    this.router.navigate([this.tabs[event.index].path], { relativeTo: this.route });
    console.log(event);
  }

}
