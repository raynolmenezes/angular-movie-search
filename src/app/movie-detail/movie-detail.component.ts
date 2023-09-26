import { Component, OnDestroy, OnInit } from "@angular/core";
import { MovieService } from "../movie.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Movie } from "../movie-list/movie-list.component";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  id!: number;
  movie!: Movie;
  movieSub$!: Subscription;

  constructor(
    private readonly movieService: MovieService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.movieSub$ = this.movieService.movie(this.id).subscribe((movie) => {
      this.movie = movie;
      console.log(this.movie);
    });
  }

  ngOnDestroy(): void {
    this.movieSub$.unsubscribe();
  }
}
