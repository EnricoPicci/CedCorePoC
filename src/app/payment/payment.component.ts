import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  tabs = [
    {id: 'sepa', label: 'SEPA', path: 'sepa'},
    {id: 'mav', label: 'MAV', path: 'mav'}
  ];

  constructor() {}

  ngOnInit() {
  }

}
