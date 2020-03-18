import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SeriesModel } from 'src/app/models/serial.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  @Input() series: SeriesModel;

  get genres(): string {
    return this.series.genres.join(', ');
  }

  get imgLink(): string {
    return this.series.coverBaseUrl + '/140x210';
  }
}
