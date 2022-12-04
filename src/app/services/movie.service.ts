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
  selectedDropdownOption = 'popularity.asc';
  selectedGeners : number[] = [];
  constructor(
    private dataService: DataService
  ) {}

  getMovies(page = 1): IListPage {
    console.log(this.genres$.getValue());
    this.dataService.getMovies(page, this.selectedDropdownOption, this.selectedGeners).subscribe(
      (res: IListPage) => {
        this.listPage$.next(res);

        // const temporaryMovies = [...this.movies$.getValue()];
        // res.results.forEach(element => {
        //   temporaryMovies.push(element);
        // });
        // this.movies$.next(temporaryMovies);
        // this.setMovieGenres(temporaryMovies, this.genres$.getValue());
        // this.setCredits(temporaryMovies);

        // if(temporaryMovies){
        //   res.results.forEach(element => {
        //     temporaryMovies.push
        //   });
        // }

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
