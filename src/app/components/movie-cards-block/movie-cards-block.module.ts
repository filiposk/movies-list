import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardsBlockComponent } from './movie-cards-block.component';
import { MovieCardModule } from '../movie-card/movie-card.module';
import { LoadMoreButtonModule } from '../load-more-button/load-more-button.module';

@NgModule({
  declarations: [MovieCardsBlockComponent],
  imports: [
    CommonModule, MovieCardModule, LoadMoreButtonModule
  ],
  exports: [MovieCardsBlockComponent]
})
export class MovieCardsBlockModule { }
