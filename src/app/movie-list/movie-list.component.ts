import { Component, Input, OnInit, ViewChild } from "@angular/core";
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

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"],
})
export class MovieListComponent implements OnInit {
  str(arg0: number): string | any[] | null | undefined {
    return arg0.toString();
  }
  @Input() moviepreview: Movie;

  allMoviesCache: Movie[];

  movietitle: string;
  movies: Movie[] = [];
  moviesNumber: number = 12;
  checkboxstate = false;
  runboxstate = false;
  selectedGenre: string[];
  genrelist: string[];
  isFilterOpen: boolean = false;
  selectedMovie: Movie;
  currentPage: number = 1;
  limit: number = 12;
  sidebar_icon = "keyboard_arrow_right";

  changeSidebarIcon() {
    if (this.sidebar_icon === "keyboard_arrow_right") {
      this.sidebar_icon = "keyboard_arrow_left";
    } else {
      this.sidebar_icon = "keyboard_arrow_right";
    }
  }

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.movieService.getGenresfromHttp().subscribe((data: string[]) => {
      this.genrelist = data;
    });
  }

  closePreview() {
    this.moviepreview = null;
  }

  Search(): void {
    this.movies = [];
    this.currentPage = 1;
    this.loadMovies();
  }

  ImgError(index: number) {
    this.movies.splice(index, 1);
  }

  loadMovies(): void {
    if (!this.allMoviesCache) {
      this.movieService.getMoviesfromHttp().subscribe((data: Movie[]) => {
        this.allMoviesCache = data;
        this.processMovies();
      });
    } else {
      this.processMovies();
    }
  }

  processMovies(): void {
    let filteredMovies = [...this.allMoviesCache];

    if (this.checkboxstate) {
      filteredMovies.sort((a, b) => a.year.localeCompare(b.year));
    }
    if (this.runboxstate) {
      filteredMovies = filteredMovies.filter(
        (movie) => Number(movie.runtime) <= 150
      );
    }
    if (this.movietitle) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(this.movietitle.toLowerCase())
      );
    }

    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = this.currentPage * this.limit;

    this.movies = [
      ...this.movies,
      ...filteredMovies.slice(startIndex, endIndex),
    ];
    this.currentPage++;
  }

  sortbyyear() {
    this.movies = [];
    this.currentPage = 1;
    this.loadMovies();
  }

  runtime15() {
    this.movies = [];
    this.currentPage = 1;
    this.loadMovies();
  }

  onScroll(event: any): void {
    this.loadMovies();
  }
}
