import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGenre } from 'src/app/interfaces/IGenre';
import { IListPage } from 'src/app/interfaces/IListPage';
import { IMovie } from 'src/app/interfaces/IMovie';
import { DataService } from 'src/app/services/data.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-cards-block',
  templateUrl: './movie-cards-block.component.html',
  styleUrls: ['./movie-cards-block.component.scss']
})
export class MovieCardsBlockComponent implements OnInit, OnDestroy {
  subscription1$: Subscription = new Subscription;
  subscription2$: Subscription = new Subscription;
  subscription3$: Subscription = new Subscription;

  movies: IMovie[] = [];
  genres: IGenre[] = [];
  listPage: IListPage = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  };

  constructor(
    private dataService: DataService,
    private movieService: MovieService
  ) { }


  ngOnInit(): void {
    this.movieService.getMovies();
    this.movieService.listPage$.subscribe(
      (val: IListPage) => { this.listPage = val; }
    )
    this.movieService.movies$.subscribe(
      (val: IMovie[]) => { this.movies = val; }
    )
  }

  ngOnDestroy(): void {
    this.movieService.listPage$.unsubscribe();
    this.movieService.movies$.unsubscribe();
  }

  getGeners(): void {
    this.subscription1$ = this.dataService.getGenres().subscribe(
      (res: any) => {
        res.genres.forEach((element: IGenre) => {
          this.genres.push(element);
        })
      }
    )
  }

  loadMore(): void {
    const page = this.listPage.page + 1;
    const currentMovies = [...this.movies];
    const newMovies = this.movieService.getMovies(page).results;
    newMovies.forEach((element: IMovie) => {
      currentMovies.push(element);
    });
    this.movieService.movies$.next(currentMovies);

  }
}
