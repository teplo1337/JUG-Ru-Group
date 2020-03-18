import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, first } from 'rxjs/operators';
import { SeriesModel, SeriesModelInterface } from '../models/serial.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private get baseHref(): string {
    return environment.baseHref;
  }

  constructor(
    private http: HttpClient
  ) { }

  getSeries(): Observable<SeriesModel[]> {
    return this.http.get(this.baseHref + 'series.json')
      .pipe(first(), map((res: SeriesModelInterface[]) => res.map(s => new SeriesModel(s))));
  }
}
