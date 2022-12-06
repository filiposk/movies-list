import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { IListPage } from '../interfaces/IListPage';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';
import { IGenre } from '../interfaces/IGenre';
import { ICredit } from '../interfaces/ICredit';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchContactByTerm(term: {}) {
    throw new Error('Method not implemented.');
  }
  getContacts() {
    throw new Error('Method not implemented.');
  }
  baseUrl = environment.baseUrl;
  moviesUrl = this.baseUrl + 'discover/movie'
  APIKey = environment.APIKey;
  genreUrl = this.baseUrl + 'genre/movie/list';
  searchKeywordUrl = this.baseUrl + 'search/keyword'
  term: unknown;

  constructor(
    private HttpClient: HttpClient,
  ) {
  }

  getMovies(page: number, sort_by: string, genres: number[] = [], keywordId: number = 0): Observable<IListPage> {
    let params = new HttpParams()
      .set('api_key', this.APIKey)
      .set('sort_by', sort_by)
      .set('page', page);
    if (genres.length) {
      params = params.append('with_genres', genres.join(','))
    }

    if (keywordId) {
      params = params.append('with_keywords', keywordId)
    }

    return this.HttpClient.get<IListPage>(this.moviesUrl, { params }).pipe(
      catchError((err) => {
        console.log('error caught in getting movies');
        console.error(err);
        return throwError(() => err);
      })
    )
  }

  getCredits(id: number): Observable<ICredit[]> {
    const params = new HttpParams()
      .set('api_key', this.APIKey);
    return this.HttpClient.get<ICredit[]>(this.baseUrl + 'movie/' + encodeURIComponent(id) + '/credits', { params }).pipe(
      catchError((err) => {
        console.log('error caught in getting credits');
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  getGenres(): Observable<IGenre[]> {
    const params = new HttpParams()
      .set('api_key', this.APIKey);
    return this.HttpClient.get<IGenre[]>(this.genreUrl, { params }).pipe(
      catchError((err) => {
        console.log('error caught in getting genres');
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  getKeywords(key: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.APIKey)
      .set('query', key);
    return this.HttpClient.get<any>(this.searchKeywordUrl, { params }).pipe(
      catchError((err) => {
        console.log('error caught in getting keywords');
        console.error(err);
        return throwError(() => err);
      })
    );
  }
}
