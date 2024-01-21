import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTableComponent } from './movies-table.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('MoviesTableComponent', () => {
  let component: MoviesTableComponent;
  let fixture: ComponentFixture<MoviesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule],
      declarations: [MoviesTableComponent]
    });
    fixture = TestBed.createComponent(MoviesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
