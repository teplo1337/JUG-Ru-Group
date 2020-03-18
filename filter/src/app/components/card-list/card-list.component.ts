import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SeriesRepository } from 'src/app/repository/serials.repository';
import { Observable } from 'rxjs';
import { SeriesModel } from 'src/app/models/serial.model';
import { CardListViewModel } from '../viewModels/card-list.view-model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {

  constructor(
    private seriesRepository: SeriesRepository
  ) { }

  cardListViewModel = new CardListViewModel({
    serialsObs: this.serialsObs
  });

  ngOnInit(): void {
    this.initCards();
  }

  private initCards(): void {
    this.seriesRepository.updateSeries().subscribe();
  }

  get serialsObs(): Observable<SeriesModel[]> {
    return this.seriesRepository.serials;
  }

}
