import { Injectable } from '@angular/core';
import { ICredit } from '../interfaces/ICredit';
import { IGenre } from '../interfaces/IGenre';
import { IMovie } from '../interfaces/IMovie';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private dataService: DataService
  ) { }


  getMovieGenders(movies: IMovie[], genres: IGenre[]): IMovie[] {
    movies.forEach((element: IMovie) => {
      element.genre_names = [];
      element.genre_ids.forEach(
        (id: number) => {
          genres.forEach(
            (genre: IGenre) => {
              if (id === genre.id) {
                element.genre_names?.push(genre.name);
              }
            }
          )
        }
      )
    }
    )
    return movies;
  }

  getCredits(moviesList: IMovie[]) {
    moviesList
    moviesList.forEach(element => {
      element.actors = [];
      element.directors = [];
      this.dataService.getCredits(element.id).subscribe(
        (res: ICredit) => {
          console.log(res);
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
    return moviesList;
  }
}
