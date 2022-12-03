import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: IMovie = {
    adult: false,
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    genre_ids: []
  };
  constructor() { }

  ngOnInit(): void {
  }

}
