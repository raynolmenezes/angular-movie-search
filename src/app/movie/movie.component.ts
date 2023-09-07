import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;


  ngOnInit(): void {
    console.log("")
  }
}
