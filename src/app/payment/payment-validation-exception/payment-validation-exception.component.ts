import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ValidationResponse} from '../../app-shared/remote-services-interface/validation-response.interface';

@Component({
  selector: 'app-payment-validation-exception',
  templateUrl: './payment-validation-exception.component.html',
  styleUrls: ['./payment-validation-exception.component.css'],
  inputs: ['validationResponse']
})
export class PaymentValidationExceptionComponent implements OnInit {
  validationResponse: ValidationResponse;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate() {
    // we assume that 501 is the code for ADV validation exception
    if (this.validationResponse.retCode == "501") {
      this.router.navigate(['adv']);
    }
  }

}
