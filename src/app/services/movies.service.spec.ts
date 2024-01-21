import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { of } from 'rxjs';
import { DetailedMovie } from '../models/detailedMovie';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new MoviesService(httpClientSpy);
  });

  it('should return expected movies (HttpClient called once)', (done: DoneFn) => {
    const expectedMovies: Movie[] = [
      {
        "id": "61bc83da05fdcc58e98ce6e4",
        "title": "Guardians of the Galaxy",
        "year": 2014,
        "rank": 1,
        "revenue": 333.13
      },
      {
        "id": "61bc83da05fdcc58e98ce6e3",
        "title": "Prometheus",
        "year": 2012,
        "rank": 2,
        "revenue": 126.46
      },
    ];

httpClientSpy.get.and.returnValue(of(expectedMovies))
    service.getMovies().subscribe({
      next: (movies) => {
        expect(movies).withContext('expected movies').toEqual(expectedMovies);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return expected movie details (HttpClient called once)', (done: DoneFn) => {
    const expected: DetailedMovie=
      {
        "id": "61bc83da05fdcc58e98ce6e4",
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
      }
    ;

httpClientSpy.get.and.returnValue(of(expected))

    service.getMovieDetails("61bc83da05fdcc58e98ce6e4").subscribe({
      next: (details) => {
        expect(details).withContext('expected details').toEqual(expected);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
