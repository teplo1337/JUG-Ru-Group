import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FilterDataInterface } from 'src/app/models/filter.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input() items: string[] = [];
  @Input() selectedItems: string[] = [];
  private searchSubject = new Subject<string>();
  private searchSubjectSubscription: Subscription;
  checked = false;

  @Output() filterDataEmitter = new EventEmitter<FilterDataInterface>();
  @Output() resetFilterEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.searchSubjectSubscription = this.searchSubject
      .pipe(
        debounceTime(1000)
      )
      .subscribe(text => {
        const genresInput = text.toLocaleLowerCase();
        this.filterDataEmitter.emit({ genresInput });
      });
  }

  checkboxChangeHandler(genre: string) {
    this.filterDataEmitter.emit({ genre });
  }

  ngOnDestroy(): void {
    this.searchSubjectSubscription.unsubscribe();
  }

  searchChangeHandler(text: string) {
    this.searchSubject.next(text);
  }

  resetClickHandler(form): void {
    form.reset();
    this.resetFilterEmitter.emit();
  }

}
