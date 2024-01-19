import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent {
  @Input() movies: Movie[];


  constructor(private matDialog:MatDialog){

  }

 

  openMovieDetails(movie:Movie){
    this.matDialog.open(MovieDetailsComponent, {
      height:'682px',
      width:'750px',
      data:{
        movie : movie
      }
    }

      )

  }

}
