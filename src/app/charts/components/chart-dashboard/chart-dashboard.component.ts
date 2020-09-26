import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { CardGridModel } from 'src/app/utilities/models/card-grid.mode';
import { ChartData, ChartService } from 'src/app/services/chart.service';
import { ChartDotModel } from 'src/app/utilities/models/chart-dot.model';
import { store } from 'src/app/utilities/redux/store';
import { CoinModel } from 'src/app/utilities/models/coin.model';


@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent implements OnInit {

  public chartCurrencies = {
    line: "USD",
    pie: "USD",
  }


  public cols: Observable<number> = this.formService.isHandset().pipe(
    map(({ matches }) => {
      if (matches) {
        return 1
      }
      return 3
    }))


  public cards = this.formService.isHandset().pipe(
    map(({ matches }) => {

      if (matches) {
        return this.cardsMobileGrid
      }
      return this.cardsWebGrid
    })
  );

  public data: ChartDotModel[] = []
  public selectedCoins: CoinModel[] = []
  public currencies: string[] = []
  public ids: string[] = []
  public coinToDelete: CoinModel
  public currentCurrency: string
  public coinId: string

  private chartData: ChartData;

  private cardsMobileGrid: CardGridModel[] = [
    { title: 'Card 1', type: 'line', cols: 1, rows: 6 },
    { title: 'Card 2', cols: 1, rows: 6 },
    { title: 'Card 3', cols: 1, rows: 6 },
    { title: 'Card 4', type: 'history', cols: 1, rows: 6 },
  ];

  private cardsWebGrid: CardGridModel[] = [
    { title: 'Coins Real-Time  Market Price', type: 'line', cols: 2, rows: 5 },
    { title: 'Coins Currencies', type: 'bar', cols: 1, rows: 3 },
    { title: 'Coins Market Value', type: 'pie', cols: 1, rows: 3 },
    { title: 'Coin Market Price History', type: 'history', cols: 3, rows: 3 },
  ];

  constructor(
    private chartService: ChartService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
    this.getChartData()
    this.subscribeToCoinToggle()
    this.coinId = this.selectedCoins[0].id
  }


  private getChartData() {
    this.chartService.getChartData(this.ids).subscribe(
      (chartData: ChartData) => {
        this.chartData = chartData
        this.data = chartData.usd
        this.currencies = chartData.currencies

      }
    )
  }

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = store.getState().coins.selectedCoins
        this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
          return coin.id
        })
      })
    this.selectedCoins = store.getState().coins.selectedCoins
    this.ids = store.getState().coins.selectedCoins.map((coin: CoinModel) => {
      return coin.id
    })
  }

  private subscribeToCoinToggle() {
    this.chartService.deleteCoin.subscribe(
      (coin: CoinModel) => {

        if (coin) {
          this.coinToDelete = coin
          this.getChartData()
        }
      }
    )
  }


  public changeCurrency(currency: string, type: string) {

    this.data = this.chartData[currency]
    this.chartCurrencies[type] = currency.toUpperCase()
  }








}
