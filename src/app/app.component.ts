import {
  Component,
  ElementRef,
  Host,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MoviesService } from './services/movies.service';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'challenge';

  allMovies: Movie[];
  movies: Movie[];
  years: number[];
  selected_year :number=0;

  initialPage:number;
  currentPage:number;
  pageSize:number;
  
  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.calculatePageSize();
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data: any) => {
      this.allMovies = data.content;
      this.movies = this.allMovies.slice(0, this.initialPage);
      this.currentPage += this.pageSize;

      this.movieYears();
    });
  }

  movieYears() {
    this.years = [...new Set(this.allMovies.map((movie) => movie.year))].sort(
      (a, b) => a - b
    );
  }

  top10ByRevenue() {
    this.movies = this.allMovies;
    const top10Movies = this.movies.sort((a, b) => b.revenue - a.revenue);
    this.movies = top10Movies
      .slice(0, 10)
      .sort((a, b) => a.revenue - b.revenue);
  }

  selectYear(year: number) {
    this.selected_year=year;
    this.movies = this.allMovies;
    // Filter movies for the target year
    const moviesForYear = this.movies.filter((movie) => movie.year === year);

    // Sort movies by revenue in descending order
    moviesForYear.sort((a, b) => b.revenue - a.revenue);

    // Get the top 10 movies
    const top10Movies = moviesForYear.slice(0, 10);

    top10Movies.sort((a, b) => a.revenue - b.revenue);
    this.movies = top10Movies;
  }

  resetSort() {
    this.selected_year=0
    this.movies = this.allMovies
      .sort((a, b) => a.rank - b.rank)
      .slice(0, this.initialPage);
  }

  calculatePageSize() {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const default_window_height = 650;
    const default_page_size = 15;
    this.initialPage = Math.round(
      (windowHeight * default_page_size) / default_window_height
    );
    this.currentPage = this.initialPage;
    this.pageSize = this.initialPage;
  }

  updateMovies() {
    this.movies = this.allMovies.slice(0, this.currentPage);
    this.currentPage += this.pageSize;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    //calculo da altura da window
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    //calculo da altura maxima do documento incluindo a altura do body e dos elementos HTML
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    //calculo da posição do scroll
    const windowBottom = windowHeight + window.scrollY;
    //quando a posição do scroll for maior ou igual à altura da window atualiza a quantidade de filmes
    if (windowBottom >= docHeight - 1) {
      this.updateMovies();
    }
  }
}
