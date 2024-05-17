import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private symbolLookup = 'http://localhost:3000/stock-symbol-lookup'; // Replace with your API endpoint
  private companyData = 'http://localhost:3000/company-data';
  private newsData = 'http://localhost:3000/news-data';
  private insightsData = 'http://localhost:3000/insights-data';
  private chartsData = 'http://localhost:3000/charts-data';
  private insertIntoDB = 'http://localhost:3000/insert-watchlist-data';
  private getWatchlistData = 'http://localhost:3000/get-watchlist-data';
  private deleteWatchlist = 'http://localhost:3000/delete-watchlist';
  private initializeWallet = 'http://localhost:3000/initialize-wallet';
  private walletBalance = 'http://localhost:3000/wallet-balance';
  private addCompanyToPortfolio = 'http://localhost:3000/add-to-portfolio';
  private sellPortfolio = 'http://localhost:3000/sell-portfolio';
  private getPortfolioData = 'http://localhost:3000/get-portfolio-data';
  private getCurrentPrice = 'http://localhost:3000/get-current-price';
  private getCompanyPeers = 'http://localhost:3000/company-peers';
  private checkSell = 'http://localhost:3000/get-sell-quantity';
  private summaryChartCompany = 'http://localhost:3000/summary-charts-data';
  private showContainer = false;
  private cache: { [url: string]: any } = {}; // Subject to emit changes in the visibility of the container
  private showContainerSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getSymbolLookup(symbol: string): Observable<any> {
    const url = `${this.symbolLookup}?q=${symbol}`;

    return this.http.get<any>(url);
  }

  getCompanyData(symbol: string): Observable<any> {
    const url = `${this.companyData}?q=${symbol}`;
    return this.http.get<any>(url);
  }

  getCompanyPeer(symbol: string) {
    return this.http.get<any>(`${this.getCompanyPeers}?q=${symbol}`);
  }

  getNewsData(symbol: string): Observable<any> {
    const url = `${this.newsData}?q=${symbol}`;
    return this.http.get<any>(url);
  }

  getInsightsData(symbol: string): Observable<any> {
    const url = `${this.insightsData}?q=${symbol}`;
    return this.http.get<any>(url);
  }

  getChartsData(symbol: string): Observable<any> {
    const url = `${this.chartsData}?q=${symbol}`;
    return this.http.get<any>(url);
  }

  insertData(data: any) {
    return this.http.post<any>(this.insertIntoDB, data);
  }

  getCompanyChartSummary(symbol: string): Observable<any> {
    const url = `${this.summaryChartCompany}?q=${symbol}`;
    return this.http.get<any>(url);
  }

  getWatchListData() {
    return this.http.get<any>(this.getWatchlistData);
  }

  removeFromWatchList(symbol: string) {
    return this.http.delete(`${this.deleteWatchlist}/${symbol}`);
  }

  initialiseWallet() {
    return this.http.post<any>(this.initializeWallet, {});
  }

  getWalletBalance(): Observable<any> {
    return this.http.get<any>(this.walletBalance);
  }

  addToPortfolio(
    currentPrice: any,
    quantity: any,
    total: any,
    symbol: any,
    name: string
  ) {
    return this.http.post<any>(this.addCompanyToPortfolio, {
      currentPrice,
      quantity,
      total,
      symbol,
      name,
    });
  }

  sellFromPortfolio(currentPrice: any, quantity: any, total: any, symbol: any) {
    return this.http.post<any>(this.sellPortfolio, {
      currentPrice,
      quantity,
      total,
      symbol,
    });
  }

  getSellQuantity(symbol: string) {
    console.log('Symbol in service', symbol);
    return this.http.get<any>(`${this.checkSell}?symbol=${symbol}`);
  }

  getPortfolio() {
    return this.http.get<any>(this.getPortfolioData);
  }

  getCurrentPortfolioPrice(symbol: any) {
    return this.http.get<any>(`${this.getCurrentPrice}?q=${symbol}`);
  }

  setShowContainer(value: boolean) {
    this.showContainer = value;
    this.showContainerSubject.next(value); // Emit the updated value
  }

  // Method to get the visibility of the container
  getShowContainer(): Observable<boolean> {
    return this.showContainerSubject.asObservable();
  }

  setLocalStorage(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('data') as any);
  }
}
