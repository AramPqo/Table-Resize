import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngpq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isFixed = false;

  constructor(private router: Router) {
    this.router.navigate(['']);
  }

  toggleMode() {
    if (this.router.url === '/') {
      this.router.navigate(['fixed']);
      this.isFixed = true;
    } else {
      this.router.navigate(['']);
      this.isFixed = false;
    }
  }

}
