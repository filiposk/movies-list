import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FilterOptionsModule } from './components/filter-options/filter-options.module';
import { MovieCardsBlockModule } from './components/movie-cards-block/movie-cards-block.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, MovieCardsBlockModule, FilterOptionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
