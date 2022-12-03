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
    this.getGeners();
    this.getMovies();
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
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

  getMovies(): void {
    this.subscription2$ = this.dataService.getPopularMovies().subscribe(
      (res: IListPage) => {
        this.listPage = res;
        this.movies = this.listPage.results;
        this.movies = this.movieService.getMovieGenders(this.movies, this.genres);
        this.movies = this.movieService.getCredits(this.movies);
      }
    )
  }

  loadMore(): void {
    const page = this.listPage.page + 1;
    this.subscription3$ = this.dataService.getPopularMovies(page).subscribe(
      (res: IListPage) => {
        this.listPage = res;
        res.results.forEach(element => {
          this.movies.push(element);
        });
        this.movies = this.movieService.getMovieGenders(this.movies, this.genres);
        this.movies = this.movieService.getCredits(this.movies);

      }
    );
  }
}
