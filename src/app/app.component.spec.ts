import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MoviesTableComponent } from './components/movies-table/movies-table.component';
import { MoviesService } from './services/movies.service';
import { of } from 'rxjs';
import { Movie } from './models/movie';

// Mock data for testing
const mockMovies: Movie[] = [   {
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
}]
// Mock MoviesService
const moviesServiceMock = {
  getMovies: jasmine.createSpy('getMovies').and.returnValue(of(mockMovies))
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let moviesService : MoviesService;

  beforeEach(async () => TestBed.configureTestingModule({
    imports: [RouterTestingModule, MatDialogModule],
    declarations: [AppComponent,MoviesTableComponent],
    providers:[
      {provide: MoviesService, useValue: moviesServiceMock}
    ]
  }).compileComponents()
 );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('challenge');
  });

/*   it('should pass movie array to MoviesTableComponent', ()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.movies = mockMovies;
    fixture.detectChanges();

    fixture.whenStable().then( ()=> {

      const moviesTableComponent = fixture.nativeElement.querySelector('app-movies-table');

      // access the MoviesTableComponent instance and check movies property
      const moviesTableInstance = moviesTableComponent.componentInstance as MoviesTableComponent;
      expect(moviesTableInstance.movies).toEqual(mockMovies);

    })
  }) */


});
