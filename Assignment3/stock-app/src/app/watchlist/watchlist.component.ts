import { Component, OnInit } from '@angular/core';
import { Service } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];
  isLoading!: any;
  constructor(private Service: Service, private router: Router) {}

  ngOnInit() {
    this.getWatchlistData();
  }

  getWatchlistData() {
    this.isLoading = true;
    this.Service.getWatchListData().subscribe(
      (data: any) => {
        this.watchlist = data.data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching watchlist data:', error);
        this.isLoading = false;
      }
    );
  }
  removeWatchlist(item: any): void {
    this.Service.removeFromWatchList(item.symbol).subscribe(
      (response: any) => {
        if (response.success) {
          this.watchlist = this.watchlist.filter(
            (watchlistItem: any) => watchlistItem.symbol !== item.symbol
          );
        } else {
          console.error('Error removing item from watchlist:', response.error);
        }
      },
      (error: any) => {
        console.error('Error removing item from watchlist:', error);
      }
    );
  }

  navigateToSearch(symbol: string) {
    this.isLoading = true;
    this.router.navigate(['/search', symbol]);
  }
}
