import { Component, OnInit } from '@angular/core';

import {SessionService} from '../app/app-shared/session/session.service';

@Component({
  selector: 'app-dynamic-route-2',
  templateUrl: './dynamic-route-2.component.html',
  styleUrls: ['./dynamic-route-2.component.css']
})
export class DynamicRoute2Component implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.session.removeFunctionalAreaMenu();
  }

}
