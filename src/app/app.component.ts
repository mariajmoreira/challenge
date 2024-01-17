import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challenge';

  movies: Movie[];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((data:any) => {
      this.movies = data.content;
    });
  }
}
