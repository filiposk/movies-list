import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterOptionsComponent } from './filter-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterOptionsComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [FilterOptionsComponent]
})
export class FilterOptionsModule { }
