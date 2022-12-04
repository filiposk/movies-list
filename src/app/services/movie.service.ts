import { Injectable } from '@angular/core';
import { BehaviorSubject, generate, Subject } from 'rxjs';
import { ICredit } from '../interfaces/ICredit';
import { IGenre } from '../interfaces/IGenre';
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

  constructor(
    private dataService: DataService
  ) { }

  getMovies(page = 1, sort_by = 'popularity.asc'): IListPage {
    this.getGeners();
    console.log(this.genres$.getValue());
    this.dataService.getMovies(page, sort_by).subscribe(
      (res: IListPage) => {
        this.listPage$.next(res);
        if (this.movies$.getValue().length) {
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
        console.log(res.genres);
        this.genres$.next(res.genres);
        console.log(this.genres$.getValue());
      }
    )
  }

  setMovieGenres(movies: IMovie[], genres: IGenre[]): void {
    console.log(genres);
    movies.forEach((element: IMovie) => {
      element.genre_names = [];
      element.genre_ids.forEach(
        (id: number) => {
          genres.forEach(
            (genre: IGenre) => {
              if (id === genre.id) {
                element.genre_names?.push(genre.name);
                console.log(genre.name);
              }
            })
        })
    })
    console.log(movies);
    this.movies$.next(movies);
  }

  setCredits(movies: IMovie[]) {
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
}
