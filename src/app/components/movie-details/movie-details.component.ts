import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailedMovie } from 'src/app/models/detailedMovie';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movie:Movie;
  movieDetails:DetailedMovie;

  constructor(private dialogRef: MatDialogRef<MovieDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private movieService:MoviesService) { }

  ngOnInit(){
    this.movie=this.data.movie
    this.getMovieDetails()
  }

  getMovieDetails(){
    this.movieService.getMovieDetails(this.movie.id).subscribe((data:any) => {
      this.movieDetails = data;
    });
  }

  close(){
    this.dialogRef.close()
  }
}


