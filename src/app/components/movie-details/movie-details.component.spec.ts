import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoviesService } from 'src/app/services/movies.service';
import { of } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { DetailedMovie } from 'src/app/models/detailedMovie';
// Mock data for testing
const mockMovie: Movie = { id: '1', title: 'Test Movie', year: 2022, rank: 1, revenue: 1000000 };
const mockMovieDetails: DetailedMovie =       {
  "id": "1",
  "title": "Guardians of the Galaxy",
  "year": 2014,
  "rank": 1,
  "revenue": 333.13,
  "genre": "Action,Adventure,Sci-Fi",
  "description": "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
  "director": "James Gunn",
  "actors": "Chris Pratt, Vin Diesel, Bradley Cooper, Zoe Saldana",
  "runtime": 121,
  "rating": 8.1,
  "votes": 757074,
  "metascore": 76
};

// Mock MoviesService
const moviesServiceMock = {
  getMovieDetails: jasmine.createSpy('getMovieDetails').and.returnValue(of(mockMovieDetails))
};

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let dialogRefMock: MatDialogRef<MovieDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MovieDetailsComponent],
        providers: [
          { provide: MatDialogRef, useValue: dialogRefMock },
          { provide: MAT_DIALOG_DATA, useValue: { movie: mockMovie } },
          { provide: MoviesService, useValue: moviesServiceMock }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    dialogRefMock = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on initialization', () => {
    expect(moviesServiceMock.getMovieDetails).toHaveBeenCalledWith(mockMovie.id);
    expect(component.movieDetails).toEqual(mockMovieDetails);
  });


});

