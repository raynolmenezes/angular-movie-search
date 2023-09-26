import { Component, ElementRef, HostListener } from "@angular/core";
import { MovieService } from "../movie.service";
import { Movie } from "../movie-list/movie-list.component";
import { Subject, debounceTime, distinctUntilChanged, switchMap } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  movietitle: string = "";
  movies: Movie[] = [];
  private Terms = new Subject<string>();
  constructor(
    private movieService: MovieService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.Terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.movieService.searchMovies(term))
    ).subscribe((movies) => (this.movies = movies));
  }

  @HostListener("document:click", ["$event"])
  clickOutsideDetect(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.movies = [];
    }
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    if (searchTerm.length >= 3) {
      this.Terms.next(searchTerm);
    } else {
      this.movies = [];
    }
  }
}
