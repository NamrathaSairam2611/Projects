import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'stock-app';

  constructor(private router: Router, private stockService: Service) {}
  navigateToSearchFromApp() {
    const data = this.stockService.getLocalStorage()?.symbol;
    if (data) this.router.navigate(['/search', data]);
    else this.router.navigate(['/search/home']);
  }
  navigateToHomeFromApp() {
    localStorage.clear();
    this.router.navigate(['/search/home']);
  }
}
