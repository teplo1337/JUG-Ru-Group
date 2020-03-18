import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeriesModel } from '../models/serial.model';

@Injectable({
  providedIn: 'root'
})

export class SeriesRepository {
  constructor(private apiService: ApiService) {

  }

  private seriesSource = new BehaviorSubject<SeriesModel[]>([]);

  get serials(): Observable<SeriesModel[]> {
    return this.seriesSource.asObservable();
  }

  updateSeries(): Observable<SeriesModel[]> {
    return this.apiService.getSeries()
      .pipe(tap(series => this.seriesSource.next(series)));
  }
}
