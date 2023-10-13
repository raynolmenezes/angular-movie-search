import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "src/app/movie-list/movie-list.component";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(movies: Movie[], genrefilter: { genres: string[] }): Movie[] {
    if (
      !movies ||
      !genrefilter ||
      !genrefilter.genres ||
      genrefilter.genres.length == 0 ||
      genrefilter.genres.includes("")
    ) {
      return movies;
    }
    return movies.filter((movie) =>
      movie.genres.some((genre) => genrefilter.genres.includes(genre))
    );
  }
}
