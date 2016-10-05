import { Component, OnInit } from '@angular/core';

import {SessionService} from '../app-shared/session/session.service';

@Component({
  selector: 'app-adv',
  templateUrl: './adv.component.html',
  styleUrls: ['./adv.component.css']
})
export class AdvComponent implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  documentsUpdated() {
    this.session.updateNdg();
  }

}
