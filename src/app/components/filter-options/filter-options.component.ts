import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IGenre } from 'src/app/interfaces/IGenre';
import { IKeyword } from 'src/app/interfaces/IKeyword';
import { DataService } from 'src/app/services/data.service';
import { MovieService } from 'src/app/services/movie.service';
export interface type {
  text: string, value: string
}
@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss']
})

export class FilterOptionsComponent implements OnInit, OnDestroy {
  dropdownOptions: type[] = [
    { text: 'Popularity Desc', value: 'popularity.desc' },
    { text: 'Popularity Asc', value: 'popularity.asc' },
    { text: 'Release Date Desc', value: 'release_date.desc' },
    { text: 'Popularity Asc', value: 'release_date.asc' },
    { text: 'Original Title Des', value: 'original_title.desc' },
    { text: 'Original Title Asc', value: 'original_title.asc' },
  ]

  selectedDropdownOption = 'popularity.asc';
  genres: IGenre[] = [];
  keywords: IKeyword[] = [];
  searchField!: FormControl;
  keyword = '';
  constructor(
    private dataService: DataService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieService.genres$.subscribe(
      (val: IGenre[]) => {
        this.genres = val;
        this.genres.forEach((element: IGenre) => {
          element.active = false;
        })
      }
    )

    this.movieService.keywords$.subscribe(
      (val: IKeyword[]) => {
        this.keywords = val;
      }
    )
  }

  ngOnDestroy(): void {
    this.movieService.genres$.unsubscribe();
    this.movieService.keywords$.unsubscribe();
  }

  getOption(): void {
    this.movieService.selectedDropdownOption = this.selectedDropdownOption;
  }

  addOrRemoveGenre(selectedGenre: IGenre): void {
    selectedGenre.active = !selectedGenre.active;
    const activeGeners: number[] = [];
    this.genres.forEach((genre: IGenre) => {
      if (genre.active) {
        activeGeners.push(genre.id)
      }
    });
    this.movieService.selectedGeners = activeGeners;
  }


  getKeywords(event: any): void {
    if(event.target.value){
      this.movieService.getKeywords(event.target.value);
    }
  }

  setKeyword(keyword: IKeyword): void {
    this.keyword = keyword.name;
    this.movieService.keywordId = keyword.id;
    this.movieService.keywords$.next([]);
  }

  getMoviesByOptions(): void {
    this.movieService.getMovies();
  }
}



