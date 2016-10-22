import { Component, OnInit } from '@angular/core';

import {SessionService} from '../app/app-shared/session/session.service';

@Component({
  selector: 'app-dynamic-route-1',
  templateUrl: './dynamic-route-1.component.html',
  styleUrls: ['./dynamic-route-1.component.css']
})
export class DynamicRoute1Component implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.session.removeFunctionalAreaMenu();
  }

}
