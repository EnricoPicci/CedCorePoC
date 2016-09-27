import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sepa-payment',
  templateUrl: './sepa-payment.component.html',
  styleUrls: ['./sepa-payment.component.css']
})
export class SepaPaymentComponent implements OnInit {
  iban: string;

  constructor() { }

  ngOnInit() {
  }

  submitPayment() {
    console.log('Payment submitted')
  }

}
