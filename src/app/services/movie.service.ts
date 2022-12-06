import { Injectable } from '@angular/core';
import { BehaviorSubject, generate, Subject } from 'rxjs';
import { IGenre } from '../interfaces/IGenre';
import { IKeyword } from '../interfaces/IKeyword';
import { IListPage } from '../interfaces/IListPage';
import { IMovie } from '../interfaces/IMovie';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  listPage$ = new BehaviorSubject<IListPage>({} as IListPage);
  movies$ = new BehaviorSubject<IMovie[]>([] as IMovie[]);
  genres$ = new BehaviorSubject<IGenre[]>([] as IGenre[]);
  keywords$ = new BehaviorSubject<IKeyword[]>([] as IKeyword[]);
  selectedDropdownOption = 'popularity.asc';
  selectedGeners: number[] = [];
  keywordId: number = 0;
  constructor(
    private dataService: DataService
  ) { }

  getMovies(page = 1): IListPage {
    this.dataService.getMovies(page, this.selectedDropdownOption, this.selectedGeners, this.keywordId).subscribe(
      (res: IListPage) => {
        this.listPage$.next(res);
        if (this.listPage$.getValue().page > 1) {
          this.setMovieGenres(this.movies$.getValue(), this.genres$.getValue());
          this.setCredits(this.movies$.getValue());
        }
        else {
          this.setMovieGenres(res.results, this.genres$.getValue());
          this.setCredits(res.results);
        }
      }
    )
    return this.listPage$.getValue();
  }

  getGeners(): void {
    this.dataService.getGenres().subscribe(
      (res: any) => {
        this.genres$.next(res.genres);
      }
    )
  }


  setMovieGenres(movies: IMovie[], genres: IGenre[]): void {
    movies.forEach((element: IMovie) => {
      element.genre_names = [];
      element.genre_ids.forEach(
        (id: number) => {
          genres.forEach(
            (genre: IGenre) => {
              if (id === genre.id) {
                element.genre_names?.push(genre.name);
              }
            })
        })
    })
    this.movies$.next(movies);
  }

  setCredits(movies: IMovie[]): void {
    movies.forEach(element => {
      element.actors = [];
      element.directors = [];
      this.dataService.getCredits(element.id).subscribe(
        (res: any) => {
          if (res.cast) {
            res.crew?.forEach((cast: any) => {
              if (!element.actors?.includes(cast.name)) {
                element.actors?.push(cast.name);
              }
            });
          }
          if (res.crew) {
            res.crew.forEach((crew: any) => {
              if (crew.job === 'Director')
                element.directors?.push(crew.name)
            });
          }
        }
      )
    });
    this.movies$.next(movies);
  }


  getKeywords(key: string): void {
    this.dataService.getKeywords(key).subscribe(
      (res) => {
        this.keywords$.next(res.results);
      }
    )
  }
}
