import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartDotModel } from '../utilities/models/chart-dot.model';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { store } from '../utilities/redux/store';
import { tap } from 'rxjs/operators';

export interface ChartData {
  usd : ChartDotModel[],
  eur : ChartDotModel[],
  ils : ChartDotModel[], 
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public url: string = environment.server + '/api/coins/chart'

  constructor(
    private http: HttpClient,

  ) { }


  // POST - get currencies for chart - http://localhost:3000/api/coins/chart
 
  public getChartData(): Observable<ChartData> {
    const ids = store.getState().coins.selectedCoins
    return this.http.post<ChartData>(this.url, { ids }, { reportProgress: true }).pipe(
      tap((data : ChartData) => {
        
      })
    )

  }
}
