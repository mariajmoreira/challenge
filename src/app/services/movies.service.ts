import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { DetailedMovie } from '../models/detailedMovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiUrl = 'http://movie-challenge-api-xpand.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/api/movies`);
  }

  getMovieDetails(id : string): Observable<DetailedMovie> {
    return this.http.get<DetailedMovie>(`${this.apiUrl}/api/movies/`+id);
  }
}
