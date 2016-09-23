import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  sepa() {
    this.router.navigate(['sepa'], { relativeTo: this.route });
  }
  mav() {
    this.router.navigate(['mav'], { relativeTo: this.route });
  }
}
