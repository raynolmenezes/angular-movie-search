import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { Movie } from './movie-list/movie-list.component'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor (private readonly http: HttpClient) {}
  // private MOVIE_URL = 'http://localhost:3000/movies';
  // private genre = 'http://localhost:3000/genres';

  // getMoviesfromHttp() {
  //   return this.http.get<Movie[]>(this.MOVIE_URL);
  // }

  // getGenresfromHttp() {
  //   return this.http.get<string[]>(this.genre);
  // }

  private readonly DB_URL = 'assets/db.json'

  getMoviesfromHttp () {
    return this.http
      .get<{ movies: Movie[] }>(this.DB_URL)
      .pipe(map((data) => data.movies))
  }

  getGenresfromHttp () {
    return this.http
      .get<{ genres: string[] }>(this.DB_URL)
      .pipe(map((data) => data.genres))
  }

  searchMovies (term: string): Observable<Movie[]> {
    return this.getMoviesfromHttp().pipe(
      map((movies) =>
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        ).slice(0, 5)
      )
    )
  }

  movie (id: number) {
    return this.http
      .get<{ movies: Movie[], genres: string[] }>(this.DB_URL)
      .pipe(map((data) => data.movies.find((movie) => +movie.id === +id)))
  }
}
