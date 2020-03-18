import { Observable, BehaviorSubject } from 'rxjs';
import { SeriesModel } from 'src/app/models/serial.model';
import { map, first } from 'rxjs/operators';
import { FilterDataInterface } from 'src/app/models/filter.model';

export class CardListViewModel {
  serialsObs: Observable<SeriesModel[]>;
  private selectedGenres: string[] = [];
  private selectedGenresInput = '';
  private currentSeriesSource = new BehaviorSubject<SeriesModel[]>([]);

  get currentSeries(): Observable<SeriesModel[]> {
    return this.currentSeriesSource.asObservable();
  }

  get genres(): Observable<string[]> {
    return this.serialsObs.pipe(map(serials => serials.reduce((a, s) => {
      s.genres.forEach(g => a.add(g));
      return a;
    }, new Set([]))))
    .pipe(map(set => Array.from(set)));
  }

  constructor(data?: CardListViewModelInterface) {
    this.serialsObs = data.serialsObs;
    this.serialsObs.subscribe(res => this.currentSeriesSource.next(res));
  }

  private changeSelectedGenres(genre: string, genresInput: string = null) {
    if (genre) {
      const genreSelected = this.selectedGenres.includes(genre);
      if (genreSelected) {
        this.selectedGenres = this.selectedGenres.filter(sg => sg !== genre);
      } else {
        this.selectedGenres.push(genre);
      }
    }
    if (genresInput !== null) {
      this.selectedGenresInput = genresInput;
    }
  }

  applyFilter(filterDataInterface: FilterDataInterface) {
    const { genre, genresInput } = filterDataInterface;

    this.changeSelectedGenres(genre, genresInput);

    this.serialsObs.pipe(
      map(serials => serials
        .filter(s => {
          const isCurrentGenre = this.selectedGenres.length === 0 ||
            this.selectedGenres
              .every(g => s.genres.includes(g));

          const isCurrentTitle = !this.selectedGenresInput ||
            s.title
              .toLocaleLowerCase()
              .indexOf(this.selectedGenresInput) !== -1 ||
            s.genres
              .some(g => g.indexOf(this.selectedGenresInput) !== -1);

          return isCurrentGenre && isCurrentTitle;
        })
      )
    )
    .pipe(first())
    .subscribe(series => this.currentSeriesSource.next(series));
  }

  resetFilter() {
    this.selectedGenres = [];
    this.selectedGenresInput = '';
    this.applyFilter({});
  }
}

export class CardListViewModelInterface {
  serialsObs: Observable<SeriesModel[]>;
}
