import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardsBlockComponent } from './movie-cards-block.component';

describe('MovieCardsBlockComponent', () => {
  let component: MovieCardsBlockComponent;
  let fixture: ComponentFixture<MovieCardsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
