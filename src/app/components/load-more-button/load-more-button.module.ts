import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadMoreButtonComponent } from './load-more-button.component';

@NgModule({
  declarations: [LoadMoreButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadMoreButtonComponent]
})
export class LoadMoreButtonModule { }
