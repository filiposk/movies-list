import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { IListPage } from '../interfaces/IListPage';
import { Observable, Subject } from 'rxjs';
import { IGenre } from '../interfaces/IGenre';
import { ICredit } from '../interfaces/ICredit';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;
  moviesUrl = this.baseUrl + 'discover/movie'
  APIKey = environment.APIKey;
  genreUrl = environment.baseUrl + 'genre/movie/list'
  constructor(
    private HttpClient: HttpClient) {
    this.getPopularMovies();
  }

  getPopularMovies(page: number = 1): Observable<IListPage> {
    const params = new HttpParams()
      .set('api_key', this.APIKey)
      .set('sort_by', 'popularity.asc')
      .set('page', page);
    return this.HttpClient.get<IListPage>(this.moviesUrl, { params });
  }

  getCredits(id: number): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.APIKey)
    return this.HttpClient.get<ICredit[]>(this.baseUrl + 'movie/' + encodeURIComponent(id) + '/credits', { params });
  }

  getGenres(): Observable<IGenre[]> {
    const params = new HttpParams()
      .set('api_key', this.APIKey)
    return this.HttpClient.get<IGenre[]>(this.genreUrl, { params });
  }
}
