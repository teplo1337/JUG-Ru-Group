export class SeriesModel {
  id: number;
  uuid: string;
  title: string;
  displayTitle: string;
  coverBaseUrl: string;
  ottPosterBaseUrl: string;
  genres: string[] = [];
  year: string;
  ratings: SeriesRating;
  relativeUrl: string;
  watchUrl: string;

  constructor(data?: SeriesModelInterface) {
    if (data) {
      this.id = data.id;
      this.uuid = data.uuid;
      this.title = data.title;
      this.displayTitle = data.displayTitle;
      this.coverBaseUrl = data.coverBaseUrl;
      this.ottPosterBaseUrl = data.ottPosterBaseUrl;
      this.genres = data.genres || [];
      this.year = data.year;
      this.ratings = new SeriesRating(data.ratings);
      this.relativeUrl = data.relativeUrl;
      this.watchUrl = data.watchUrl;
    }
  }
}

export class SeriesRating {
  currentRating: string;
  kp: KR;

  constructor(data?: SeriesRatingInterface) {
    if (data) {
      this.currentRating = data.currentRating;
      this.kp = new KR(data.kp);
    }
  }
}

export interface SeriesRatingInterface {
  currentRating: string;
  kp: KR;

}

export class KR {
  ready: boolean;
  value: string;
  type: string;

  constructor(data?: KRInterface) {
    if (data) {
      this.ready = !!data.ready;
      this.value = data.value;
      this.type = data.type;
    }
  }
}

export interface KRInterface {
  ready: boolean;
  value: string;
  type: string;
}


export interface SeriesModelInterface {
  id: number;
  uuid: string;
  title: string;
  displayTitle: string;
  coverBaseUrl: string;
  ottPosterBaseUrl: string;
  genres: string[];
  year: string;
  ratings: SeriesRatingInterface;
  relativeUrl: string;
  watchUrl: string;
}
