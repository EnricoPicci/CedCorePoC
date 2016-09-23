import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private router: Router) {}

  payment() {
    this.router.navigate(['/payment']);
  }
  adv() {
    this.router.navigate(['/adv']);
  }
}
