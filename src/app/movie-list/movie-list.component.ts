import { Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { MovieService } from "../movie.service";

export interface Movie {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

export interface MovieTMDB {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"],
})
export class MovieListComponent implements OnInit {
  str(arg0: number): string | any[] | null | undefined {
    return arg0.toString();
  }
  movietitle: string;
  movies: Movie[] = [];
  checkboxstate = false;
  runboxstate = false;
  selectedGenre = "";
  genrelist: string[];
  isFilterOpen: boolean = false;
  selectedMovie: Movie;

  constructor(
    private movieService: MovieService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.movieService.getMoviesfromHttp().subscribe((data: Movie[]) => {
      this.movies = data;
    });
    this.movieService.getGenresfromHttp().subscribe((data: string[]) => {
      this.genrelist = data;
    });
  }

  previewMovieInfo(movie: Movie): void {
    this.selectedMovie = movie;
  }

  Search(): void {
    if (this.movietitle != "") {
      this.movieService.getMoviesfromHttp().subscribe((data: Movie[]) => {
        this.movies = data.filter((movie) =>
          movie.title.toLowerCase().includes(this.movietitle.toLowerCase())
        );
      });
      this.movieService.getGenresfromHttp().subscribe((data: string[]) => {
        this.genrelist = data;
      });
    } else {
      this.movieService.getMoviesfromHttp().subscribe((data: Movie[]) => {
        this.movies = data;
      });
      this.movieService.getGenresfromHttp().subscribe((data: string[]) => {
        this.genrelist = data;
      });
    }
  }

  sortbyyear(checkboxstate) {
    this.movieService.getMoviesfromHttp().subscribe((data: Movie[]) => {
      if (checkboxstate) {
        this.movies = data.sort((a, b) => a.year.localeCompare(b.year));
      } else {
        this.movies = data;
      }
    });
  }

  runtime15(runboxstate) {
    this.movieService.getMoviesfromHttp().subscribe((data: Movie[]) => {
      if (runboxstate) {
        this.movies = data.filter((movie) => movie.runtime > "150");
      } else {
        this.movies = data;
      }
    });
  }

  ImgError(index: number) {
    this.movies.splice(index, 1);
  }
}
