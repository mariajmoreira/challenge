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

  allMovies : Movie[];
  movies: Movie[];
  years:number[];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.getMovies()
  }

  getMovies(){
    this.movieService.getMovies().subscribe((data:any) => {
      this.allMovies = data.content;
      this.movies=this.allMovies;
      this.movieYears();
    });
  }

  movieYears(){
    this.years = [...new Set(this.movies.map(movie => movie.year))].sort((a, b) => a - b);
  }

  top10ByRevenue(){
    this.movies=this.allMovies
    const top10Movies = this.movies.sort((a, b) => b.revenue - a.revenue);
    this.movies = top10Movies.slice(0,10).sort((a, b) => a.revenue - b.revenue)
  }

  selectYear(year:number){
    this.movies=this.allMovies
    // Filter movies for the target year
  const moviesForYear = this.movies.filter(movie => movie.year === year);

  // Sort movies by revenue in descending order
  moviesForYear.sort((a, b) => b.revenue - a.revenue);

  // Get the top 10 movies
  const top10Movies = moviesForYear.slice(0, 10);

  top10Movies.sort((a, b) => a.revenue - b.revenue);
    this.movies=top10Movies;
  }

  resetSort(){
    this.movies=this.allMovies.sort((a, b) => a.rank - b.rank);
  }
}
